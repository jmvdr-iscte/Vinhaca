import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Linking, Platform } from 'react-native';
import emailjs from '@emailjs/browser'
import { Alert } from 'react-native';


interface ContactUsProps {
    navigation: any;
}


const ContactUs = (props: ContactUsProps) => {
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleFirstNameChange = (firstName) => {
        setFirstName(firstName);
    };

    const handleLastNameChange = (lastName) => {
        setLastName(lastName);
    };

    const handleEmailChange = (email) => {
        setEmail(email);
    };

    const handleTitleChange = (title) => {
        setTitle(title);
    };

    const handleContentChange = (content) => {
        setContent(content);
    };

    const handleCancel = () => {
        props.navigation.navigate("Home")
    };

    const handleSubmit = () => {
        const serviceId = 'service_p6v6cer';
        const templateId = 'template_aobrb8j';
        const publicKey = 'wHjxFddDm77gPglpE';

        const templateParams = {
            subject: title,
            to_email: email,
            message: content,
            first_name: firstName,
            last_name: lastName
        };
        console.log(templateParams)
        if (title == '' || email == '' || content == '') {
            Alert.alert('Error: email, subject and title are mandatory fields');
        } else {
            emailjs.send(serviceId, templateId, templateParams, publicKey)
                .then((response) => {
                    Alert.alert('Success', 'Email sent successfully');
                })
                .catch((error) => {
                    Alert.alert('Error', `Failed to send email: ${error.message}`);
                });
            setTitle('')
            setContent('')
            setEmail('')
            setFirstName('')
            setLastName('')
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                onChangeText={handleFirstNameChange}
                value={firstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                onChangeText={handleLastNameChange}
                value={lastName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={handleEmailChange}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Title"
                onChangeText={handleTitleChange}
                value={title}
            />
            <TextInput
                ref={input => { this.textInput = input }}

                style={styles.input}
                placeholder="Content"
                onChangeText={handleContentChange}
                value={content}
                multiline={true}
            />
            <Button
                title="Submit"
                onPress={handleSubmit}
            />
            <Button
                title="Cancel"
                onPress={handleCancel}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});

export default ContactUs;
