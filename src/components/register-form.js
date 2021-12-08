import {useHandleAsync} from "../context/auth";
import FormInput from "./form-input";
import SpinnerButton from "./spinner-button";
import React from "react";

function RegisterForm({ onSubmit }) {
  const {run, isLoading, isError, error} = useHandleAsync();

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <form className="container-lg max-w-sm mt-lg" onSubmit={handleSubmit}>
      <FormInput id="email" type="email">Courriel</FormInput>
      <div className="form__group">
        <FormInput id="password" type="password">Mots de passe</FormInput>
        <FormInput id="confirm" type="password">Confirmer le mots de passe</FormInput>
      </div>
      <FormInput id="name">Nom</FormInput>
      <SpinnerButton isLoading={isLoading}>S’inscrire</SpinnerButton>
    </form>
  )
}

export default RegisterForm;
