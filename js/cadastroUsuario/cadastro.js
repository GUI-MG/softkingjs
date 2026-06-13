const supabaseURL = "https://qwsiadauxdkklhbkvbns.supabase.co";
const supabaseKey = "sb_publishable_ugUgXOsb0oM56NMQ7xNZLQ_Bbob3Xhm";

const supabaseClient = supabase.createClient(supabaseURL, supabaseKey);

const formulario = document.getElementById('cadastroUsuario');

formulario.addEventListener('submit', async(e) => {
    e.preventDefalut();

    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const rua = document.getElementById('rua').value;
    const cidade = document.getElementById('cidade').value;
    const numero = document.getElementById('numero').value;
    const cep = document.getElementById('cep').value;
    const usuario = document.getElementById('usuarioCadastro').value;
    const senha = document.getElementById('senhaCadastro').value;
    const confirmarSenhaCadastro = document.getElementById('confirmarSenhaCadastro').value;
    const tipo = "comum";

    if(senha!=confirmarSenhaCadastro) {
        Swal.fire({
            title: 'Oops!',
            text: 'Senhas incompatíveis...',
            confirmButtonText: 'Ok',
            confirmButtonColor: 'rgb(0, 160, 0)',
            showCancelButton: false
        })
        return;
    }

    const {data: authData, error: authError} = await supabaseClient.auth.signUp({
        email: email,
        senha: senha
    });

    if(authError) {
        Swal.fire({
            title: 'Oops!',
            text: 'Ocorreu um erro...',
            confirmButtonText: 'Ok',
            confirmButtonColor: 'rgb(0, 160, 0)',
            showCancelButton: false
        })
        return;
    }

    const idGerado = auth.user.id;

    const {error: tabelaError} = await supabaseClient
        .from('comum')
        .insert([
            {
                nome: nome,
                sobrenome: sobrenome,
                telefone: telefone,
                email: email,
                rua: rua,
                cidade: cidade,
                numero: parseInt(numero),
                cep: cep,
                fk_usuario_id: idGerado
            }
        ]);

    if(tabelaError) {
        Swal.fire({
            title: 'Oops!',
            text: 'Erro ao cadastro o usuário...',
            confirmButtonText: 'Ok',
            confirmButtonColor: 'rgb(0, 160, 0)',
            showCancelButton: false
        });
    }else {
        Swal.fire({
            title: 'Concluído!',
            text: 'Usuário cadastrado com sucesso!',
            confirmButtonText: 'Ok',
            confirmButtonColor: 'rgb(0, 160, 0)',
            showCancelButton: false
        });
        formulario.reset();
    }


}); 