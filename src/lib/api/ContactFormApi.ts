import { supabase } from "$lib/supabaseClient";

export type ContactTopic = 'GENERAL' | 'PARTNERSHIP' | 'NEW PROJECT';

export class ContactFormData {
    name: string;
    email: string;
    topic: ContactTopic;
    message: string;

    constructor(data: {name: string; email: string; topic: ContactTopic; message: string}) {
        this.name = data.name;
        this.email = data.email;
        this.topic = data.topic;
        this.message = data.message;
    }
}

export default class ContactFormApi {

    static async submit(formData: ContactFormData): Promise<void> {
        const { error } = await supabase.from('contact_messages').insert({
            name: formData.name,
            email: formData.email,
            topic: formData.topic,
            message: formData.message
        });

        if (error) {
            console.error("Failed to submit contact form:", error);
            throw new Error("Failed to submit contact form");
        }
    }

}