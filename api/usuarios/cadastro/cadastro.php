<?php

header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . '../../../config/db.php';

$jsonInicial = file_get_contents('php://input');
$dados = json_decode($jsonInicial, true);

try {
    $conexao->beginTransaction();

    $nome = $dados['nome'];
    $sobrenome = $dados['sobrenome'];
    $email = $dados['email'];
    $rua = $dados['rua'];
    $cidade = $dados['cidade'];
    $numero = $dados['numero'];
    $cep = $dados['cep'];
    $usuario = $dados['usuarioCadastro'];
    $senha = $dados['senhaCadastro'];

    $sqlUsuario = "INSERT INTO usuario (usuario, senha, tipo) VALUES (:usuario, :senha, :tipo)";

    $stmtUsuario = $conexao->prepare($sqlUsuario);

    $stmtUsuario -> execute([
        ':usuario' => $usuario,
        ':senha' => $senha,
        'tipo' => 'comum'
    ]);

    $idUsuario = $conexao->lastInsertId();

    $sqlUsuarioComum = "INSERT INTO comum (nome, sobrenome, email, rua, cidade, numero, cep, fk_usuario_id) VALUES (:nome, :sobrenome, :email, :rua, :cidade, :numero, :cep, :fk_usuario_id)";

    $stmtUsuarioComum -> prepare($sqlUsuarioComum);

    $stmtUsuarioComum -> execute([
        ':nome' => $nome,
        ':sobrenome' => $sobrenome,
        ':email' => $email,
        ':rua' => $rua,
        ':cidade' => $cidade,
        ':numero' => $numero,
        ':cep' => $cep,
        ':fk_usuario_id' => $idUsuario
    ]);

    $conexao->commit();

    http_response_code(201);
} catch (PDOException $error) {
    if($conexao->inTransaction(0)) {
        $conexao->rollBack();
    }

    http_response_code(500);
}

$stmt = $connection->prepare($sql);

?>