# Configuración de EmailJS - Guía Completa

## 🔧 Configuración Actual
Las credenciales ya están configuradas en el archivo `src/utils/emailService.js`:
- SERVICE_ID: `service_1von8vz`
- TEMPLATE_ID: `template_oa0gwgm`
- PUBLIC_KEY: `9ASHY49fDgKmq-_JP`

## 📧 Configuración en EmailJS Dashboard

### 1. Verificar la Plantilla
En tu dashboard de EmailJS, ve a "Email Templates" y verifica que la plantilla `template_oa0gwgm` tenga el siguiente contenido:

**Subject:**
```
Resultados {{questionnaire_type}} - {{patient_name}}
```

**Content (HTML):**
Copia todo el contenido del archivo `src/templates/email-template.html` en el campo de contenido de la plantilla.

**IMPORTANTE para Adjuntos:**
Para que los adjuntos funcionen correctamente, asegúrate de que en la configuración de tu plantilla en EmailJS:

1. **En la sección "Attachments"** de la plantilla, agrega:
   - **Name**: `{{attachment_name}}`
   - **Content**: `{{attachment_content}}`  
   - **Type**: `{{attachment_type}}`

2. **O usa la sintaxis directa** en el HTML de la plantilla (ya incluida en el template):
   ```html
   {{#attachment_name}}
   <p>Archivo adjunto: {{attachment_name}}</p>
   {{/attachment_name}}
   ```

### 2. Configurar Variables en la Plantilla
Asegúrate de que las siguientes variables estén disponibles en tu plantilla:

#### Variables Principales:
- `{{patient_name}}` - Nombre del paciente
- `{{patient_age}}` - Edad del paciente  
- `{{patient_gender}}` - Género del paciente
- `{{questionnaire_type}}` - Tipo de cuestionario
- `{{date}}` - Fecha de evaluación
- `{{message}}` - Mensaje del formulario
- `{{csv_data}}` - Datos del CSV como texto

#### Variables HAD:
- `{{anxiety_score}}`, `{{anxiety_level}}`, `{{anxiety_description}}`
- `{{depression_score}}`, `{{depression_level}}`, `{{depression_description}}`

#### Variables STOP-Bang:
- `{{total_score}}`, `{{risk_level}}`, `{{risk_description}}`

#### Variables TFEQ-R18:
- `{{cognitive_restraint_score}}`, `{{uncontrolled_eating_score}}`, `{{emotional_eating_score}}`

#### Variables para Respuestas Individuales:
- `{{q1}}`, `{{q2}}`, `{{q3}}`, etc. - Respuestas específicas de cada pregunta (0-3 para HAD, 1-4 para TFEQ)
- `{{snoring}}`, `{{tired}}`, `{{observed}}`, etc. - Para STOP-Bang (Sí/No)

**NOTA IMPORTANTE**: Para el cuestionario HAD, las respuestas se envían con los valores numéricos exactos (0-3). Un valor 0 es válido y significa "En lo absoluto" o "Nunca" según la pregunta.

**NOTA**: Ya no se usan adjuntos CSV. Todo el contenido se presenta de forma legible en el correo.

### 3. Configurar el Correo de Destino
En la plantilla de EmailJS, configura el campo "To email" con la dirección del médico:
```
doctor@ejemplo.com
```

## 🚨 Posibles Problemas y Soluciones

### Error 1: "Failed to send email"
**Causa:** Configuración incorrecta de credenciales
**Solución:** Verifica que los IDs en `emailService.js` sean correctos

### Error 2: "Template not found"
**Causa:** El TEMPLATE_ID no existe o está mal escrito
**Solución:** Verifica el ID de la plantilla en el dashboard

### Error 3: "Service not found"
**Causa:** El SERVICE_ID no existe o el servicio no está activo
**Solución:** 
1. Ve a "Email Services" en el dashboard
2. Verifica que el servicio `service_1von8vz` esté activo
3. Si no existe, crea un nuevo servicio y actualiza el ID

### Error 4: "Invalid public key"
**Causa:** La PUBLIC_KEY es incorrecta
**Solución:** Ve a "Account" > "General" y copia la clave pública correcta

### Error 5: Variables no se renderizan
**Causa:** Las variables no están configuradas correctamente en la plantilla
**Solución:** 
1. Ve a la plantilla en EmailJS
2. Asegúrate de usar la sintaxis `{{variable_name}}`
3. Guarda la plantilla

## 🧪 Probar la Configuración

### 1. Verificar en la Consola del Navegador
Abre las herramientas de desarrollador (F12) y ve a la pestaña "Console" cuando envíes un correo. Deberías ver:
```
Sending email with params: {...}
Email sent successfully: {...}
```

### 2. Verificar el Correo
El correo debería llegar con:
- Asunto: "Resultados [TIPO] - [NOMBRE PACIENTE]"
- Contenido formateado con los resultados
- Datos CSV al final del correo

## 📝 Estructura del Correo Final

El correo incluirá:
1. **Header** - Título y fecha
2. **Información del Paciente** - Nombre, edad, género
3. **Resultados del Cuestionario** - Puntuaciones e interpretación
4. **Datos CSV** - Todos los datos en formato de texto
5. **Disclaimer** - Nota médica importante

## 🔄 Funcionalidad Actual

- ✅ **Sin Modal**: El correo se envía directamente al hacer clic
- ✅ **Correo Fijo**: Se envía siempre al médico configurado en EmailJS
- ✅ **Datos Incluidos**: CSV como texto plano en el correo
- ✅ **Estados de Carga**: Botón muestra "Enviando..." durante el proceso
- ✅ **Confirmación**: Alert cuando se envía exitosamente

## 🎯 Botones en los Cuestionarios

Cada cuestionario ahora tiene un botón **"Enviar al Médico"** que:
1. Recopila todos los datos del paciente y respuestas
2. Calcula las puntuaciones automáticamente  
3. Genera el CSV como texto
4. Envía todo por correo electrónico a la dirección configurada
5. Muestra confirmación de envío

## 📎 Adjuntos CSV

### Funcionalidad de Adjuntos
El sistema ahora intenta enviar los datos como archivo CSV adjunto real además del texto en el correo:

- **Archivo CSV**: Se genera un archivo con nombre `{nombre_paciente}_{fecha}_{tipo_cuestionario}.csv`
- **Contenido**: Incluye todas las respuestas del paciente y resultados calculados
- **Formato**: CSV estándar compatible con Excel y otras aplicaciones

### ⚠️ Limitaciones de EmailJS
**IMPORTANTE**: Los adjuntos en EmailJS tienen limitaciones:

1. **Plan Gratuito**: Puede no soportar adjuntos o tener límites estrictos
2. **Tamaño**: Los archivos están limitados a tamaños pequeños
3. **Tipos**: Solo ciertos tipos MIME están permitidos

### Alternativas si los Adjuntos No Funcionan
Si los adjuntos no llegan al correo, el sistema incluye todos los datos como texto en el cuerpo del correo:

1. **CSV como Texto**: Los datos se muestran en formato CSV legible
2. **Copia Manual**: El médico puede copiar y pegar en un archivo CSV
3. **Actualización de Plan**: Considerar upgrading a un plan de EmailJS que soporte adjuntos

### Verificar Adjuntos
Para verificar si los adjuntos están funcionando:
1. Envía un cuestionario de prueba
2. Revisa el correo recibido
3. Busca un archivo adjunto CSV
4. Si no hay adjunto, usa los datos CSV del texto del correo

### ⚡ Sistema de Respaldo Automático
El sistema tiene un mecanismo de respaldo inteligente:

1. **Primer Intento**: Envía el correo con archivo adjunto
2. **Si Falla**: Automáticamente reintenta sin adjunto
3. **Notificación**: Informa al usuario si se envió sin adjunto
4. **Datos Seguros**: Los datos CSV siempre están en el texto del correo

### 🔧 Configuración de Plantilla Actualizada
La plantilla HTML ahora incluye:
- **Sección de Adjuntos**: Muestra información cuando hay un archivo adjunto
- **Respaldo CSV**: Datos siempre disponibles como texto
- **Compatibilidad**: Funciona con y sin adjuntos
- **Feedback Visual**: Indica claramente si hay archivos adjuntos
