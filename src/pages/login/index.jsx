//import { useNavigate } from "react-router-dom";
import Input from "../../components/input";
import Button from "../../components/button";
import { useState } from "react";

function isValidEmail(email) {
  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailFormat.test(email);
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  //const navigate = useNavigate();

  async function handleSubmit() {
    if (email === "" || password === "") {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Por favor, insira um email válido.");
      return;
    }

    setErrorMessage("");
  }

  const isButtonDisabled = !isValidEmail(email) || password === "";

  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-white p-8 shadow-md w-full max-w-sm"
      >
        <h3 className="text-2xl font-bold mb-4 text-center">Login</h3>
        {errorMessage && (
          <div className="mb-4 text-red-500">{errorMessage}</div>
        )}
        <Input
          label="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          label="Senha"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button
          text="Entrar"
          onClick={handleSubmit}
          disabled={isButtonDisabled}
        />
      </form>
    </main>
  );
}
