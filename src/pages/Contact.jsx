function Contact() {
  return (
    <div className="py-12">
      <div className="container max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Contacto</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">
            Puedes escribirnos a soporte@nutriboost.com o llenar el formulario
            abajo.
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <input
                type="text"
                placeholder="Nombre"
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Correo</label>
              <input
                type="email"
                placeholder="Correo"
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mensaje</label>
              <textarea
                placeholder="Mensaje"
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-32"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
