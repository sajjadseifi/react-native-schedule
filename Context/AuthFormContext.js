import React from 'react'

const AuthFormContext = React.createContext()

export const AuthFormProvider = AuthFormContext.Provider;
export const AuthFormConsumer = AuthFormContext.Consumer;

export default AuthFormContext;