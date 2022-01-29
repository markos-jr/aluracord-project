import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import {useRouter} from  'next/router';
import { createClient } from '@supabase/supabase-js'
import {ButtonSendSticker} from '../src/components/ButtonSendSticker';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMxNTE5OCwiZXhwIjoxOTU4ODkxMTk4fQ.l9Du12kFW0sphptm9aDcpoNJ_Zcnz1eba5vPbbtJbfE';
const SUPABE_URL = 'https://xadvsrwaemhzsddpdmqv.supabase.co';
const supabaseClient = createClient(SUPABE_URL, SUPABASE_ANON_KEY);


function escutaMensagensEmTempoReal(adicionaMensagem) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (respostaLive) => {
            adicionaMensagem(respostaLive.new);
        })
        .subscribe();
}

export default function ChatPage() {
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    console.log('roteamento.query', roteamento.query);
    console.log('usuarioLogado', usuarioLogado);
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([

    ]);

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                //console.log('Dados da consulta:', data);
                setListaDeMensagens(data);
            });

        escutaMensagensEmTempoReal((novaMensagem) => {
            console.log('Nova mensagem: ', novaMensagem);
            console.log('listaDeMensagens:' + listaDeMensagens);
            setListaDeMensagens((valorAtualDaLista) => {
                console.log('listaDeMensagens:' + listaDeMensagens);
                return [
                    novaMensagem,
                    ...valorAtualDaLista,
                ]
            });
        });
    }, []);

    // Sua lógica vai aqui

    // ./Sua lógica vai aqui

    /* Usuário
    // usuário aperta enter para enviar
    // tem que adicionar o texto na listagem 
    // Dev
    // usar o onChange, useState
    // lista de mensagens */

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            // id: listaDeMensagens.length + 1,
            de: usuarioLogado,
            texto: novaMensagem,
        };

        supabaseClient
            .from('mensagens')
            .insert([
                // Tem que ser um objeto com os MESMOS CAMPOS que você escreveu no supabase
                mensagem
            ])
            .then(({ data }) => {
                console.log('Criando Mensagem: ', data);
            });

        setMensagem('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundImage: `url(https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)`,

                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: '#212931cc',
                    height: '100vh', //.
                    width: '100vw', //.
                    maxWidth: '1300px', //.
                    maxHeight: '95vh',
                    padding: '32px',

                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor:'#000000CC',
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '30px',
                        backgroundBlendMode: 'multiply',
                        backgroundPosition: 'top right'
                    }}
                >
                    <MessageList mensagens={listaDeMensagens} />
                    {/* {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}:{mensagemAtual.texto}
                            </li>
                        )
                    })}*/}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                console.log(event);
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[100],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[900]
                            }}
                        />
                        {/* CallBack */}
                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                //console.log(' [Usando o Componente] Salva esse sticker no banco', sticker);
                                handleNovaMensagem(':sticker: ' + sticker);
                            }}
                        />
                        {/* Botão de enviar(ok) */}
                        <Button
                            onClick={() => handleNovaMensagem(mensagem)}
                            label='Ok'
                            styleSheet={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '15px',
                                marginBottom: '20px',
                                width: '15%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.primary[500],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[900]
                            }}
                            onKeyPress={(event) => {
                                if (event.key === "Enviar") {
                                    event.preventDefault();

                                    handleNovaMensagem(mensagem);
                                }
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                   <strong>Chat</strong>  
                </Text>
                <Button
                    styleSheet={{
                        color: appConfig.theme.colors.neutrals[100],
                    }}
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log(props.listaDeMensagens);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["100"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[300],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[100],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {/* Declarativo */}
                        {/*Condicional: {mensagem.texto.startsWith(':sticker:').toString()}*/}
                        {mensagem.texto.startsWith(':sticker:')
                            ? (
                                <Image 
                                src={mensagem.texto.replace(':sticker:', '')}
                                styleSheet={{
                                    maxWidth: "20%",
                                }}
                                />
                            )
                            : (
                                mensagem.texto
                            )}

                    </Text>
                );
            })}
        </Box>
    )
}