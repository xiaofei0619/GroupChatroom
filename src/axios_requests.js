//https://github.com/axios/axios
import axios from "axios";

export class AxiosRequests {
    constructor() {
        this.httpClient = axios.create({baseURL: 'https://c4pmjpfqt6.execute-api.us-west-2.amazonaws.com/ChatRoomAPI'});
    }

    async scanHistory(timestamp) {
        try {
            const response = await this.httpClient.get('/message', {
                params: {
                    time: timestamp
                }
            })
            return response.data
        } catch (error) {
            console.log(error);
        } 
    }

    async postMessage(userName, timestamp, userMessage) {
        try {
            await this.httpClient.post('/message', {
                name: userName,
                time: timestamp,
                message: userMessage
            })
        } catch (error) {
            console.log(error);
        }
    }
}