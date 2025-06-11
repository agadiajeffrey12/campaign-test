interface CreateCampaignInterface {
    name: string;
    maillingList:string;
    sendersEmail: string;
    sendersName: string;
    nameOfEmail: string;
    template?: string;
    message: string;
    time:{
        date: Date;
        time: string;
    };
    canFollowUpUsers: boolean;
    newSubject: string;
    
}