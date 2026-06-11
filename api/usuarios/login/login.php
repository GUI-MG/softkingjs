<?php

headers("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . '../../../config/db.php';

$jsonInicial = file_get_contents('php://input');
$dados = json_decode($jsonInicial, true);

try {
    $usuario = $dados['user'];
    $senha = $dados['senha'];

    $sql = "SELECT id, usuario, senha FROM usuario WHERE usuario = :usuario";

    $stmt = $conexao->prepare($sql);

    $stmt->execute([
        ':usuario' => $usuario
    ]);

    $usuarioEncontrado = $stmt->fetch();

    if($usuarioEncontrado === false) {
        http_response_code(401);
        exit;
    }

    $senhaCorreta = password_verify($senha, $usuarioEncontrado['senha']);

    if(!senhaCorreta) {
        http_response_code(401);
        exit;
    }

    http_response_code(200);


} catch (PDOException $error) {
    http_response_code(500);
}