import { Mail, Phone, MapPin, Clock, ExternalLink } from "lucide-react";

export default function ContactInfoSection() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Visítanos",
      content: "Gdor, A. Zanichelli 335, X5186 Alta Gracia, Córdoba",
      description: "Campus principal",
    },
    {
      icon: Phone,
      title: "Llámanos",
      content: "+54 3547 423858",
      description: "Lunes a Viernes 9:00-17:00",
    },
    {
      icon: Mail,
      title: "Escríbenos",
      content: "info@paravachasca.edu.ar",
      description: "Te responderemos en 24h",
    },
    {
      icon: Clock,
      title: "Horario de atención",
      content: "Lunes a Viernes: 9:00 a 12:00 y de 14:00 a 17:00",
      description: "Te esperamos en secretaria",
    },
  ];

  // Coordenadas exactas de la escuela
  const schoolLocation = {
    lat: -31.6463431,
    lng: -64.4375161,
    address: "Gdor, A. Zanichelli 335, X5186 Alta Gracia, Córdoba",
  };

  return (
    <section id="informacion" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Información y Ubicación
          </h2>
          <p className="text-lg text-gray-600">
            Encuéntranos fácilmente y conoce nuestros horarios de atención.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Información de contacto
              </h3>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition"
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-900 font-medium">
                        {item.content}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Nuestra ubicación
            </h3>
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg h-full">
              <div className="relative h-96">
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                    schoolLocation.lng - 0.01
                  }%2C${schoolLocation.lat - 0.005}%2C${
                    schoolLocation.lng + 0.01
                  }%2C${schoolLocation.lat + 0.005}&layer=mapnik&marker=${
                    schoolLocation.lat
                  }%2C${schoolLocation.lng}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Ubicación del IPET 132 Paravachasca en Alta Gracia"
                  aria-label="Mapa interactivo mostrando la ubicación del IPET 132 Paravachasca"
                />

                {/* Overlay con información */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">
                        IPET 132 Paravachasca
                      </p>
                      <p className="text-gray-600 text-xs">
                        {schoolLocation.address}
                      </p>
                    </div>
                    <a
                      href={`https://www.openstreetmap.org/?mlat=${schoolLocation.lat}&mlon=${schoolLocation.lng}#map=17/${schoolLocation.lat}/${schoolLocation.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-2 bg-primary-600 text-white text-xs font-medium rounded-lg hover:bg-primary-700 transition flex-shrink-0"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Abrir mapa
                    </a>
                  </div>
                </div>
              </div>

              {/* Instrucciones de cómo llegar */}
              <div className="p-6 mt-6 bg-primary-50 rounded-xl border border-primary-200">
                <h4 className="font-semibold text-primary-900 mb-3 text-lg">
                  ¿Cómo llegar?
                </h4>
                <ul className="text-primary-800 space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Ubicado sobre calle Zanichelli, a 4 cuadras de la plaza
                      principal
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Transporte público: líneas que pasan por el centro de Alta
                      Gracia
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Amplio estacionamiento para visitantes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
