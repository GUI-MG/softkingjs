<?php
$host = 'db.xxvkvdyjpaavaudyvqpg.supabase.co:5432/postgres';
$port = '5432';
$db = 'postgres';
$user = 'postgres';
$pass = 'SoftKingJS@!';
$dsn = 'postgresql://postgres:[SoftKingJS!@]@db.xxvkvdyjpaavaudyvqpg.supabase.co:5432/postgres';
$opcoes = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
];

try {
    $connection = new PDO($dsn, $user, $pass);
} catch (PDOException $error) {
    echo "Oops! Ocorreu um erro ao conectar-se com o banco de dados";
}
?>

