const enums = require('../utils/enums');
 
class MailService {
    constructor(logRepository) {
      this.log = logRepository;
    }
  
    async sendEmailUserCreated(email) {
        try{  
            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(process.env.SG_APIKEY);
            
            const msg = {
                to: email, 
                from: process.env.SG_FROM,
                subject: 'Welcome to WareUp',
                template_id: 'd-2592feb6275647f6a0cc7bdf4e24ee1a'
            };

            sgMail.send(msg)
            .then(() => {
                
            })
            .catch((error) => {
                this.log.create('Error in sendEmailUserCreated: '+ error, enums.logsType.service); 
            })
        }
        catch (error) {
            this.log.create('Error in sendEmailUserCreated: '+ error, enums.logsType.service);
        }
    }


    async sendEmailPasswordRecovery(user, dataEncrypt) {
        try{ 
            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(process.env.SG_APIKEY);
            
            const msg = {
                to: user.email, 
                from: process.env.SG_FROM,
                subject: 'Recuperacion de contraseña',
                template_id: 'd-2592feb6275647f6a0cc7bdf4e24ee1a',
                dynamicTemplateData: { 
                    linkEncrypt: process.env.FRONTEND_URL+'/password-recovery?'+dataEncrypt,
                    name: user.name
                }
            }
            sgMail
            .send(msg)
            .then(() => {
            })
            .catch((error) => {
                this.log.create('Error in sendEmailPasswordRecovery: '+error, enums.logsType.service);
            })
        }
        catch (error) {
            this.log.create('Error in sendEmailPasswordRecovery: '+error, enums.logsType.service);
        }
    }
    async sendContactForm(contactForm) {
        try{ 
            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(process.env.SG_APIKEY);
            
            const msg = {
                to: JSON.parse(process.env.YOUR_ENV)(process.env.SG_CONTACTTO), 
                from: process.env.SG_FROM,
                subject: contactForm.subject,
                template_id: 'd-2592feb6275647f6a0cc7bdf4e24ee1a',
                dynamicTemplateData: {
                    clientName: contactForm.clientName,
                    email: contactForm.email,
                    phone: contactForm.phone,
                    message: contactForm.message,
                    subject: contactForm.subject
                }
            };
            
            sgMail
            .send(msg)
            .then(() => {
            })
            .catch((error) => {
                this.log.create('Error in sendContactForm: '+error, enums.logsType.service);
            })
        }
        catch (error) {
            this.log.create('Error in sendContactForm: '+error, enums.logsType.service);
        }
    }
   
}
module.exports = MailService;