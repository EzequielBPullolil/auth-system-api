# auth-system-api

API de autenticacion basica que utiliza JWT con entry secreto para comprobar la autenticacion de un usuario

## Api basica
Entrys:
 - **user/**
	 - **POST**: registra un usuario con username y password
	 - **GET**:  se envía un username y password, si el username y el password son credenciales de usuario validas regresa un TOKEN

 - **secret/**
	 - **GET**: Recibe un token valido de usuario y regresa 'hi user' seguido del username autenticado
