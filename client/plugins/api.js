import Users from "@/api/users.js";
import Notify from "@/api/notify.js";
import Questions from '@/api/questions.js';
import AgeLevels from '@/api/age-levels.js';
import Countries from '@/api/countries.js';
import ForgotPassword from '@/api/forgot-password.js';
import UserProfile from '@/api/userProfile';
import Subjects from "@/api/subjects";
import Uploads from "@/api/uploads";
import QuestionSets from "../api/question-sets";
import QuestionTypes from "../api/question-types";
import Institutes from "../api/institutes";


export default (context, inject) => {
  //Intialize API factories
  const factories = {
    users: Users(context.$axios),
    notify: Notify(context.$axios),
    institutes: Institutes(context.$axios),
    questions: Questions(context.$axios),
    ageLevels: AgeLevels(context.$axios),
    countries: Countries(context.$axios),
    forgotPassword: ForgotPassword(context.$axios),
    userProfile: UserProfile(context.$axios),
    subjects: Subjects(context.$axios),
    uploads: Uploads(context.$axios),
    questionSets: QuestionSets(context.$axios),
    questionTypes: QuestionTypes(context.$axios)

  }

  inject("api", factories);
}