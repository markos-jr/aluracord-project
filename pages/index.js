import{Box, Button, Text, TextField, Image} from '@skynexui/components'
import React from 'react';
import {useRouter} from 'next/router'  //sistema de roteamento do nextJS
import appConfig from "../config.json";



function Titulo(props) {
  console.log(props);
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
                  ${Tag}{
            color: ${appConfig.theme.colors.neutrals['000']};
            font-size: 24px;
            font-weight 600;
                  }
                `}</style>
    </>
  );
}

export default function PaginaInicial() {
  /* const username = 'markos-jr'; */
  const [username, setUsername] = React.useState('markos-jr');
  const roteamento = useRouter();

  return (
    <>

      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: '#38603D' /* appConfig.theme.colors.primary[100] */,
          backgroundImage: 'url(https://images.unsplash.com/photo-1465788786008-f75a725b34e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },


            width: '100%', maxWidth: '700px',
            borderRadius: '15px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: '#212931cc',

          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              console.log('Alguém submeteu o form')
              roteamento.push('/chat')
              /* window.location.href = '/chat'  */// modo tradicional de chamar a pg chat.js
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Boas-vindas de volta!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            {

          /*     Código anterior ao TextField
          
          <input type="text"
              //value= 'markos-jr'
              onChange={function (event){
                console.log('usuário digitiou', event.target.value) -
                //Onde está o valor?
                const valor = event.target.value;
                //Trocar o valor da variavel
                //Através do react e avise quem precisa
                setUsername(valor);
              }}
              /> */}
            { <TextField
              value= {username}
              onChange={function (event){
                console.log('usuário digitiou', event.target.value)
                //Onde está o valor?
                const valor = event.target.value;
                //Trocar o valor da variavel
                //Através do react e avise quem precisa
                setUsername(valor);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[900],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[100],
                },

              }}
            />}
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["100"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
            {/* Formulário */}
          </Box>


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: 'rgb(0,0,0,0)',
              borderRadius: '0px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[700],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}