const supabaseURL = "https://qwsiadauxdkklhbkvbns.supabase.co";
const supabaseKey = "sb_publishable_ugUgXOsb0oM56NMQ7xNZLQ_Bbob3Xhm";

const supabaseClient = supabase.createClient(supabaseURL, supabaseKey);

const formularioLogin = document.getElementById('login');

formularioLogin.addEventListener('submit', async(e) => {
    e.preventDefault();

    const usuario = document.getElementById('user').value;
    const senha = document.getElementById('senha').value;
    
    try {
        
        const {data, error} = await supabaseClient.auth.signInWithPassword({
            usuario: usuario,
            senha: senha
        });

        if(error) {
            Swal.fire({
                title: 'Oops...',
                text: 'Usuário e/ou senha incorretos.',
                confirmButtonText: 'Ok',
                confirmButtonColor: 'rgb(0, 160, 0)',
                icon: 'warning'
            });
            return;
        }

        Swal.fire({
            title: 'Sucesso!',
            text: 'Efetuando o login...',
            showConfirmButton: false,
            icon: 'success'
        });

        window.location.href='../../index.html';
    } catch (error) {
        Swal.fire({
            title: 'Oops...',
            text: 'Ocorreu um erro inesperado...',
            confirmButtonText: 'Ok',
            confirmButtonColor: 'rgb(0, 160, 0)',
            icon: 'warning'
        });
    }
})