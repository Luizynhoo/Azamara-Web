import emailjs from "@emailjs/browser"

const SendMailContact = ( formData )=> {

    emailjs
        .send(
            import.meta.env.VITE_SERVICE_EMAIL_CONTACT_KEY,
            import.meta.env.VITE_TEMPLATE_EMAIL_CONTACT_KEY,
            formData,
            import.meta.env.VITE_PUBLIC_KEY_EMAIL_CONTACT
        )
};

const SendMailBudget = ( formData )=> {
    emailjs.send(
        import.meta.env.VITE_SERVICE_EMAIL_BUDGET_KEY,
        import.meta.env.VITE_TEMPLATE_EMAIL_BUDGET_KEY,
        formData,
        import.meta.env.VITE_PUBLIC_KEY_EMAIL_BUDGET
    )
}

export {SendMailContact,SendMailBudget}

