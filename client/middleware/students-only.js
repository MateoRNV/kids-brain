export default async function ({ $auth, redirect }) {
    let user = $auth.user;
    if (user.role != 'Student') {
        redirect('/')
    } 
}