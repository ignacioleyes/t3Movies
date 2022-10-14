import clienteAxios from "./Axios.jsx";

const loginService = (payload) => {
  try {
    const retorno = Promise.resolve(
      clienteAxios.post("/cuentas/login", {
        email: payload.email,
        password: payload.password,
      })
    );
    return retorno;
  } catch (error) {
    throw new Error(error);
  }
};

export default loginService;
