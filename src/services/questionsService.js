import http from "../config/ApiConfig.js"

class QuestionService{
    getQuestions(){
        return http.get('/questions');
}
}
export default new QuestionService();
