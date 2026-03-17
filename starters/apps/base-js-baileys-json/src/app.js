import { createBot, createProvider, createFlow, addKeyword } from '@builderbot/bot'
import { JsonFileDB as Database } from '@builderbot/database-json'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'

const PORT = process.env.PORT ?? 3008

// 1. FLUJO: SERVICIOS TECNOLÓGICOS
const flowServicios = addKeyword(['1', 'servicios', 'mantenimiento'])
    .addAnswer([
        '🛠️ *Nuestros Servicios Tecnológicos:*',
        '',
        '• Mantenimiento preventivo y correctivo de PCs/Laptops.',
        '• Instalación de software y sistemas operativos.',
        '• Optimización de equipos lentos.',
        '• Soporte técnico remoto y presencial.',
        '',
        'Escribe *ASESOR* para cotizar un servicio específico.'
    ])

// 2. FLUJO: AUTOMATIZACIÓN (BOTS)
const flowBots = addKeyword(['2', 'automatizar', 'bot'])
    .addAnswer([
        '🚀 *Potencia tu negocio con un Chatbot:*',
        '',
        '✅ Instalación y Configuración: **$100**',
        '✅ Mantenimiento Mensual: **$20**',
        '',
        'Tu negocio atenderá 24/7, enviará precios, imágenes y filtrará clientes automáticamente.',
        '',
        '¿Quieres ver una demo? Escribe *ASESOR*'
    ])

// 3. FLUJO: DUDAS FRECUENTES
const flowDudas = addKeyword(['3', 'dudas', 'preguntas'])
    .addAnswer([
        '❓ *Preguntas Frecuentes:*',
        '',
        '• *¿Necesito mi PC encendida?* No, el bot funciona en la nube 24/7.',
        '• *¿Uso mi mismo número?* Sí, el bot se vincula a tu número actual.',
        '• *¿Puedo seguir usando mi WhatsApp?* Totalmente, puedes leer y responder normalmente.',
        '',
        'Si tienes otra duda, escribe *ASESOR*'
    ])

// 4. FLUJO: ASESOR
const flowAsesor = addKeyword(['4', 'asesor', 'humano', 'hablar'])
    .addAnswer('👤 ¡Perfecto! He avisado a mi equipo. En unos minutos un asesor humano se contactará contigo para ayudarte personalmente. ¡Gracias por tu paciencia!')

// FLUJO PRINCIPAL (BIENVENIDA)
const welcomeFlow = addKeyword(['hola', 'buenos', 'buenas', 'inicio', 'menu'])
    .addAnswer(`🙌 ¡Hola! Bienvenido a **EL BOT TECNOLÓGICO** 🤖`)
    .addAnswer(
        [
            'Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?',
            '',
            '👉 *1* Servicios Tecnológicos 🛠️',
            '👉 *2* Automatiza tu Negocio 🚀',
            '👉 *3* Dudas Frecuentes ❓',
            '👉 *4* Conversar con un Asesor 👤',
            '',
            'Escribe el *número* de la opción que desees.'
        ]
    )

const main = async () => {
    const adapterFlow = createFlow([welcomeFlow, flowServicios, flowBots, flowDudas, flowAsesor])
    const adapterProvider = createProvider(Provider, { version: [2, 3000, 1015901301] })
    const adapterDB = new Database({ filename: 'db.json' })

    const { handleCtx, httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    httpServer(+PORT)
}

main()
