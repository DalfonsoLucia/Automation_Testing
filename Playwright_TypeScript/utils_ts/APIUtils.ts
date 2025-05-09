export class APIUtils
{

    apiContext: any
    loginPayLoad: any

    constructor(apiContext:any, loginPayLoad:any) 
    {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken() {
        
        let loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayLoad
            })
            //the response was successful (status in the range 200-299)
            //expect((loginResponse).ok()).toBeTruthy();
            const responseJson = await loginResponse.json();
            const token = responseJson.token;
            console.log(token);
            return token;
    };

    async createOrder(orderPayLoad: string) 
    {
            let response = {token : String, orderId : String}
            response.token = await this.getToken();

            let orderResponse:any
            orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
            data : orderPayLoad,
            headers: {
    
                'Authorization' : response.token,
                'Content-Type' : 'application/json'
            },
    
        })
        if (!orderResponse.ok()) {
            const errorDetails:any = await orderResponse.text(); 
            throw new Error(`Errore nella creazione dell'ordine: ${orderResponse.status()} - ${orderResponse.statusText()}`);
        }
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);

        if (!orderResponseJson.orders || !Array.isArray(orderResponseJson.orders) || orderResponseJson.orders.length === 0) {
            throw new Error("Nessun ordine trovato nella risposta API.");
        }
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        
        console.log(orderId);
        return response;

    };



}

module.exports = {APIUtils};