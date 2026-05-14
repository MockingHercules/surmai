<?php
// Front controller: every cart request enters here.
// Run locally with: php -S localhost:8000 -t public

session_start();

require_once __DIR__ . '/../app/Models/Product.php';
require_once __DIR__ . '/../app/Models/Cart.php';
require_once __DIR__ . '/../app/Controllers/CartController.php';

$controller = new CartController();
$action = $_GET['action'] ?? 'view';

switch ($action) {
    case 'add':
        $controller->add();
        break;
    case 'update':
        $controller->update();
        break;
    case 'remove':
        $controller->remove();
        break;
    case 'clear':
        $controller->clear();
        break;
    case 'summary':
        $controller->summary();
        break;
    default:
        $controller->view();
        break;
}
