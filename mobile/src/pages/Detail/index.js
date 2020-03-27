import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MAilComposer from 'expo-mail-composer';
import logo from '../../assets/logo.png';


import styles from './styles';

export default function Defail() {
    const navigator = useNavigation();
    const router = useRoute();
    
    const incident = router.params.incident;
    const msg = `Olá ${incident.nome}, estou entrando em contato pois gostaria de ajudar no caso '${incident.titulo}' com o valor de ${Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(incident.valor)}`;

    function navigateBack() {
        navigator.goBack();
    }

    function sendMail() {
        MAilComposer.composeAsync({
            subject: `Herói do caso: ${incident.titulo}`,
            recipients: [`${incident.email}`],
            body: msg
        })
    }

    function sendWhatsApp() {
        Linking.openURL(`whatsapp://send?phone=${incident.numero}&text=${ msg }`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>
            </View>
            <View style={styles.incident}>
                <Text style={styles.incidentProperty, { marginTop: 0 }}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.nome} de {incident.cidade}/{incident.estado}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.titulo}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.valor)}
                </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato: </Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}