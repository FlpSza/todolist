-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_rest
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `lojas`
--

DROP TABLE IF EXISTS `lojas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lojas` (
  `idLoja` int NOT NULL AUTO_INCREMENT,
  `nmLoja` varchar(255) NOT NULL,
  PRIMARY KEY (`idLoja`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lojas`
--

LOCK TABLES `lojas` WRITE;
/*!40000 ALTER TABLE `lojas` DISABLE KEYS */;
INSERT INTO `lojas` VALUES (1,'Mansão Wayne'),(2,'mansao'),(7,'');
/*!40000 ALTER TABLE `lojas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perguntas`
--

DROP TABLE IF EXISTS `perguntas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perguntas` (
  `idPergunta` int NOT NULL AUTO_INCREMENT,
  `idSetor` int DEFAULT NULL,
  `textoPergunta` text NOT NULL,
  `tipoPergunta` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idPergunta`)
) ENGINE=InnoDB AUTO_INCREMENT=177 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perguntas`
--

LOCK TABLES `perguntas` WRITE;
/*!40000 ALTER TABLE `perguntas` DISABLE KEYS */;
INSERT INTO `perguntas` VALUES (1,5,'Freezers e geladeiras estão ligados e funcionando devidamente?','Abertura'),(2,5,'O gás está aberto? O exaustor está ligado e funcionando perfeitamente?','Abertura'),(3,5,'Banho maria está em temperatura ideal para aquecer os alimentos?','Abertura'),(4,5,'Lista de requisição para abastecimento dos setores foi feito e entregue no estoque dentro do horario ? ','Abertura'),(5,5,'Tem algum alimento em falta para realizar a venda ?','Abertura'),(6,5,'Todas as etiquetas estão dentro do prazo de validade ?','Abertura'),(7,5,'Foi colocado etiquetas de uso diário nos itens que necessitam ? ','Abertura'),(8,5,'Lixeiras estão devidamente limpas e ensacadas ? ','Abertura'),(9,5,'Todos os equipamentos como (FORNO , FRITADEIRA , MICROONDAS, MAQUINA DE IFOOD), estão devidamente limpo e em funcionamento para a operação ? ','Abertura'),(10,5,'Embalagens descartáveis estão abastecidos devidamente ensacados para o turno ? ','Abertura'),(11,5,'Gás está fechado ?','Fechamento'),(12,5,'Banho maria , Fogão , Fritadeira , forno estão desligado e devidamente limpos ?','Fechamento'),(13,5,'Frezzers e geladeiras estão prganizados e  com as portas fechadas ? ','Fechamento'),(14,5,'Alimentos estão devidamente guardado em seus potes com tempas e devidamente etiquetados ?','Fechamento'),(15,5,'Pias estão finalizadas e Limpas ?','Fechamento'),(16,5,'Alimentos aberto que precisam ser devolvido para o estoque estão devidamente etiquetados ?','Fechamento'),(17,5,'Todas as Etiquetas estão dentro do prazo de validade ?','Fechamento'),(18,5,'Maquina de ifood está desligada e devidamente limpa ?','Fechamento'),(19,5,'Setor atrás do elevador está limpo,  organizado e as embalagens ensacadas ?','Fechamento'),(20,5,'Lixos foram retirados e lixeiras estão devidamente limpa, higienizada e ensacadas ?','Fechamento'),(21,5,'Chão está lavado e seco ?','Fechamento'),(22,5,'Todas as Luzes estão apagadas ?','Fechamento'),(23,5,'Panelas , bolws e potes estão limpos e organizados em seus devidos lugares ? ','Fechamento'),(24,5,'Parte debaixo de todos os equipamentos ( FOGÃO , CHAPA E FORNO )estão limpos e organizados ?','Fechamento'),(25,5,'Microondas está devidamente limpo e desligado ?','Fechamento'),(26,4,'Lavagem de todos os banheiros 1 e 2º andar?','Abertura'),(27,4,'Banheiros abastecidos com papel higienico, sabonete, papel toalha? Tudo em perfeito estado?','Abertura'),(28,4,'Fiscalização de Limpeza e higienização com alcool 70º dos talheres? Todos ensacados? ','Abertura'),(29,4,'Todas as louças lavadas e guardadas?','Abertura'),(30,4,'Lavagem dos tapetes de entrada? Obs: TERÇA-FEIRA','Abertura'),(31,4,'Area de lavagem muito bem higienizada?','Abertura'),(32,4,'Pias e bancadas higienizadas com alcool 70?','Abertura'),(33,4,'Lixeira limpa e higienizada com saco de lixo?','Abertura'),(34,4,'Banheiros abastecidos com papel higienico, sabonete, papel toalha? Tudo em perfeito estado?','Fechamento'),(35,4,'Limpeza e higienização com alcool 70º dos talheres? Todos ensacados?','Fechamento'),(36,4,'Todas as louças lavadas e guardadas?','Fechamento'),(37,4,'Area de lavagem muito bem higienizada?','Fechamento'),(38,4,'Pias e bancadas higienizadas com alcool 70?','Fechamento'),(39,4,'Retirou TODOS os lixos das lixeiras/deposito de lixo e colocou o lacre? Colocou na porta do restaurante?','Fechamento'),(40,4,'Limpeza do deposito de lixo?','Fechamento'),(41,2,'Impressora de pedidos ligada e funcionando corretamentete com bobina reserva suficiente?','Abertura'),(42,2,'Esta sendo feita a sanitização das frutas  com o sanitizer ou hipocloreto?','Abertura'),(43,2,'Chopeira limpa, ligada e funcionando perfeitamente?','Abertura'),(44,2,'Barril de Chopp conectado, dentro da validade, e em quantidade suficiente para o turno? Deposito do Barril devidamente higienizado?','Abertura'),(45,2,'Máquina de café limpa e quantidade de capsula suficiente para turno?','Abertura'),(46,2,'Maquina da expresso devidamente higienizada? (Bandejas, deposito de capsulas, etc...) Há louças e cápsulas em quantidade suficiente?','Abertura'),(47,2,'Máquina de suco de laranja limpa, ligada e estocada?','Abertura'),(48,2,'O suco de laranja estocado em quantidade suficiente? Geladeiras e freezer do bar limpos e estocados?','Abertura'),(49,2,'Todas as bebidas do cardápio estão disponíveis para venda? Há bebidas em temperatura ambiente suficientes?','Abertura'),(50,2,'Máquina de gelo limpa e com gelo suficiente?','Abertura'),(51,2,'Cronograma higienização maquina de gelo fixada na parede ao lado da maquina? Máquina de lavar limpa e com todos os produtos estocados?','Abertura'),(52,2,'Detergente etiquetado, esponjas, papel toalha e perfex presentes no Bar?','Abertura'),(53,2,'Lixeira vazia, limpa e com sacos de lixo estocados?','Abertura'),(54,2,'Há estoque de canudos? Recipientes do açucar e adoçante devidamente limpos e com validade?','Abertura'),(55,2,'Há frutas em geral cortados em quantidade suficientes na geladeira? Espuma de gengibre? Açucar porcionado? Frutas vermelhas?','Abertura'),(56,2,'Copos limpos, organizados e em quantidade suficiente? Taças devidamente polidas e organizadas na prateleira?','Abertura'),(57,2,'Utensílios: Espremedor, Facas, Pegadores, Macerador, Medidor, Peneira, Passador, Baldes em perfeito estado para trabalho?','Abertura'),(58,2,'O Balcão foi limpo e tirado seu forro antiderrapante?','Fechamento'),(59,2,'Bancada e pia limpo sem marcas?','Fechamento'),(60,2,'Chopeira limpa com detergente neutro e água quente, esterelizada e devidamente vedada? Máq. laranja desligada e higienizada corretamente com sabão, água e alcool 70%?','Fechamento'),(61,2,'Todos os portas cervejas foram limpos?','Fechamento'),(62,2,'Máq. de Café expresso desligada limpa e com bandejas e depositos de capsulas higienizados? Recipientes de água da máquina de café abastecidos?','Fechamento'),(63,2,'Todo o Lixo foi devidamente retirado?','Fechamento'),(64,2,'Chão do bar e local de armazenagem do barril de chopp devidamente limpos e higienizados? Desperdício/perda foi descartado e anotado no caderno corretamente?','Fechamento'),(65,2,'Copos quebrados foram anotados e descartados de forma segura? Todas as geladeiras e freezers foram reabastecidos?','Fechamento'),(66,2,'Frutas em geral e demais insumos estão na validade  para o proximo turno?Garrafas vazias foram retiradas e colocadas no estoque? Bancada de trabalho limpa e higienizada,com caixa de gelo vazia e limpa?','Fechamento'),(67,2,'Lixeiras estão limpas e higienizadas externa e internamente?','Fechamento'),(68,3,'Entrada do Restaurante (Porta e Chão) Limpos? ','Abertura'),(69,3,'Toten com cardápio na entrada e anuncio colocado conforme gerente solicitou?','Abertura'),(70,3,'Blackline externo Limpos e Expostos Corretamente com a promoção do dia? ','Abertura'),(71,3,'Balcão Esta Limpo, Gavetas Organizadas e armários?','Abertura'),(72,3,'O Caixa Está Ligado e o Sistema Funcionando Adequadamente?','Abertura'),(73,3,'Há conexão com Internet? ','Abertura'),(74,3,'Impressora Ligada, com Bobina Suficiente e Funcionando Corretamente?','Abertura'),(75,3,'Maquinas de cartão, Carregadas e Funcionando Corretamente com Bominas Suficiente?','Abertura'),(76,3,'Há Troco (Moedas e Cédulas) Suficientes para o Movimento?','Abertura'),(77,3,'Celular carregado e Funcionando Corretamente?','Abertura'),(78,3,'Canetas estocadas (4) e Formulários de Sugestões? Há Grampeador, Clipes e Elásticos Estocados?','Abertura'),(79,3,'Lixeira Vázia e Limpa?','Abertura'),(80,3,'Cardápios Limpos e Organizados ?','Abertura'),(81,3,'Mesas de Reserva Montadas de Acordo com o pedido do Cliente? ','Abertura'),(82,3,'Toda equipe e salão estão Cientes das Promoções e Formas de Pagamento?','Abertura'),(83,3,'Luminária foi Desligada?','Fechamento'),(84,3,'Tablets e celulares foram carregados? ','Fechamento'),(85,3,'Balcão da Recepção Limpo, Gavetas Organizadas?','Fechamento'),(86,3,'Canetas e Marcadores Guardados para o Dia Seguinte/turno?','Fechamento'),(87,3,'Mesas e Cadeiras da Área de externa foram guardados? ','Fechamento'),(88,3,'O Fechamento do Caixa foi Realizado com Sucesso? ','Fechamento'),(89,3,'Todas observações feitas no bordero?','Fechamento'),(90,3,'Todas as Mesas estão Fechadas?','Fechamento'),(91,3,'Fechamento de caixa assinado pelo Caixa e Gerencia e guardado no escritorio?','Fechamento'),(92,3,'Todas as Maquinas de cartão foram Fechadas (Relatórios) e colocadas para carregar? ','Fechamento'),(93,3,'Computador e Impressoras Desligados?','Fechamento'),(94,3,'O Chão do Caixa foi Limpo Adequadamente?','Fechamento'),(95,3,'Lixo devidamente Recolhido?','Fechamento'),(96,3,'Conferencia de planilha e confirmação de reservas feitas?','Fechamento'),(97,6,'Lixeiras estão limpas , higienizadas e ensacadas ?','Abertura'),(98,6,'Todas as etiquetas estão dentro do prazo de validade ?','Abertura'),(99,6,'Facas, tábuas , potes e acessórios estão em bom estado de uso ?','Abertura'),(100,6,'Tem algum insumo em falta ?','Abertura'),(101,6,'Preparo e cortes do dia já estão alinhados para ser feito ?','Abertura'),(102,6,'Listagem de quantidades produzido no dia foi entregue para o estoque ?','Abertura'),(103,6,'Lixerias estão limpas , higineizadas e ensacadas ? ','Fechamento'),(104,6,'Tábuas , facas , Potes e utensilios estão limpo e guardado em seu devido ligar ?','Fechamento'),(105,6,'Setor do Hortifrut está limpo , organizado e retirado os alimentos que estão ruim ?','Fechamento'),(106,6,'Chão está limpo ?','Fechamento'),(107,6,'Portas das geladeiras e frezers estão limpos e os mesmos equipamentos funcionando ?','Fechamento'),(108,6,'Micrroodas está limpo ? ','Fechamento'),(109,6,'Equipamentos como maquina de Moer , fatiado de Frios , selador de pães estão limpos ? e os mesmo estão funcionando ?','Fechamento'),(110,1,'Limpeza do chão e entrada de restaurante 1° e 2° andar','Abertura'),(111,1,'Cardápios limpos e organizados na recepção 1° e 2° andar','Abertura'),(112,1,'Jogo americano higienizados 1° e 2° andar','Abertura'),(113,1,'Mesa limpas e higienizadas 1° e 2° andar','Abertura'),(114,1,'Cadeiras limpas sem pó no encosto 1° e 2° andar','Abertura'),(115,1,'Estofado de apoio e encosto decorado com led limpos e higienizados 1° e 2° andar','Abertura'),(116,1,'Molduras limpas 1° e 2° andar','Abertura'),(117,1,'Vidros espelhos em geral limpos 1° e 2° andar','Abertura'),(118,1,'Bandejas pretas higienizadas 1° e 2° andar','Abertura'),(119,1,'Ketchup, mostarda, pimenta, guardanapo, sal, azeite, balsâmico abastecidos/Verificar validade 1° e 2° andar','Abertura'),(120,1,'Prato, saco de talher, organizados e limpos 1° e 2° andar','Abertura'),(121,1,'Vasos de flores limpos 1° e 2° andar','Abertura'),(122,1,'Prateleiras de vidro, luminárias, nichos, personalizados luminosos limpos e higienizados 1° e 2° andar','Abertura'),(123,1,'Limpeza do palco 1° e 2° andar','Abertura'),(124,1,'Televisores funcionando corretamente 1° e 2° andar','Abertura'),(125,1,'Luminoso externo em perfeito funcionamento 1° e 2° andar','Abertura'),(126,1,'Lampadas: Todas funcionando corretamente 1° e 2° andar','Abertura'),(127,1,'Internet funcionando 1° e 2° andar','Abertura'),(128,1,'Som funcionando corretamente todos os salões 1° e 2° andar','Abertura'),(129,1,'Ar condicionado ligado (conforme necessidade todos) 1° e 2° andar','Abertura'),(130,1,'Saidas do Ar condicionado limpas 1° e 2° andar','Abertura'),(131,1,'Talheres e pratos polidos e organizados corretamente	1° e 2° andar','Abertura'),(132,1,'Extintores de incêndio posicionados e dentro da validade	1° e 2° andar','Abertura'),(133,1,'Nenhuma mesa bamba 1° e 2° andar','Abertura'),(134,1,'Frestas das mesas limpas 1° e 2° andar','Abertura'),(135,1,'Mesas/ombrelone montados adequadamente - Quinta/Sexta/Sabado/Domingo	1° e 2° andar','Abertura'),(136,1,'Televisores ligados e funcionando corretamente 1° e 2° andar','Abertura'),(137,1,'Audio/vídeo ligado em volume conforme procedimento 1° e 2° andar','Abertura'),(138,1,'Ar condicionado funcionando e temperatura do salão geral 20º	1° e 2° andar','Abertura'),(139,1,'Lâmpadas e luminárias funcionando corretamente 1° e 2° andar','Abertura'),(140,1,'Sistema funcionando e testados, inclusive tablet e celulares 1° e 2° andar','Abertura'),(141,1,'Reservas repassadas para cozinha	1° e 2° andar','Abertura'),(142,1,'Higiene pessoal e uniforme COMPLETO e limpo	','Abertura'),(143,1,'Boa aparencia e apresentação da equipe','Abertura'),(144,1,'Sem acessórios extravagantes','Abertura'),(145,1,'Caneta no bolso e tablets carregados','Abertura'),(146,1,'Vasos Sanitários e Descargas 1° e 2° andar','Abertura'),(147,1,'Pias e Torneiras 1° e 2° andar','Abertura'),(148,1,'Molduras e Portas 1° e 2° andar','Abertura'),(149,1,'Chão e Lixeiras 1° e 2° andar','Abertura'),(150,1,'Lampadas funcionando corretamente 1° e 2° andar','Abertura'),(151,1,'Som funcionando e com volume adequado 1° e 2° andar','Abertura'),(152,1,'Papel Toalha','Abertura'),(153,1,'Papel Higiênico','Abertura'),(154,1,'Saboneteiras','Abertura'),(155,1,'Espelhos','Abertura'),(156,1,'Fechar porta com chave mesmo com clientes dentro (Acompanhar a saida dos mesmos)','Fechamento'),(157,1,'Gás da cozinha foi desligado?','Fechamento'),(158,1,'Ar condicionado foi desligado?','Fechamento'),(159,1,'Som ambiente foi desligado?','Fechamento'),(160,1,'Tvs foram todos desligados?','Fechamento'),(161,1,'Computadores está desligado?','Fechamento'),(162,1,'Toldo está fechado?','Fechamento'),(163,1,'Todos os caixas foram guardados no escritorio?','Fechamento'),(164,1,'Geladeiras e freezers estão ligados e em perfeito funcionamento?','Fechamento'),(165,1,'Todas as luzes estão desligadas?','Fechamento'),(166,1,'Mesas e cadeiras da area externa foram guardadas devidamente?','Fechamento'),(167,1,'Estoques estão trancados?','Fechamento'),(168,1,'Luminoso desligado?','Fechamento'),(169,1,'Todas as portas e janelas estão devidamente trancadas?','Fechamento'),(170,1,'Nenhum equipamento que deveria estar ligado está desligado?','Fechamento'),(171,1,'Nenhum equipamento que deveria estar desligado está ligado?','Fechamento'),(172,1,'O portão está cadeado?','Fechamento'),(173,1,'Lixo recolhido e colocado na porta do restaurante com lacre?','Fechamento'),(174,1,'Estoque de bebidas organizado?','Fechamento'),(175,1,'Alarme acionado corretamente?','Fechamento'),(176,1,'Não há nenhuma sujeira em geral no restaurante? Area de lavagem','Fechamento');
/*!40000 ALTER TABLE `perguntas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respostas`
--

DROP TABLE IF EXISTS `respostas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `respostas` (
  `idResposta` int NOT NULL AUTO_INCREMENT,
  `idPergunta` int DEFAULT NULL,
  `idUsuario` int DEFAULT NULL,
  `resposta` text NOT NULL,
  PRIMARY KEY (`idResposta`),
  KEY `idPergunta` (`idPergunta`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `respostas_ibfk_1` FOREIGN KEY (`idPergunta`) REFERENCES `perguntas` (`idPergunta`),
  CONSTRAINT `respostas_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respostas`
--

LOCK TABLES `respostas` WRITE;
/*!40000 ALTER TABLE `respostas` DISABLE KEYS */;
/*!40000 ALTER TABLE `respostas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `setores`
--

DROP TABLE IF EXISTS `setores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `setores` (
  `idSetor` int NOT NULL AUTO_INCREMENT,
  `nmSetor` varchar(255) NOT NULL,
  PRIMARY KEY (`idSetor`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setores`
--

LOCK TABLES `setores` WRITE;
/*!40000 ALTER TABLE `setores` DISABLE KEYS */;
INSERT INTO `setores` VALUES (1,'salao'),(2,'bar'),(3,'caixa'),(4,'ASG'),(5,'cozinha'),(6,'producao'),(7,'administrador'),(11,'');
/*!40000 ALTER TABLE `setores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `idLoja` int DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `idSetor` int DEFAULT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `email` (`email`),
  KEY `idLoja` (`idLoja`),
  KEY `fk_setor` (`idSetor`),
  CONSTRAINT `fk_setor` FOREIGN KEY (`idSetor`) REFERENCES `setores` (`idSetor`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idLoja`) REFERENCES `lojas` (`idLoja`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'admin',NULL,'admin@starinfo.com','admin',7),(9,'asg',1,'asg@starinfo.com','123',4),(10,'bar',1,'bar@starinfo.com','123',2),(11,'caixa',1,'caixa@starinfo.com','123',3),(12,'cozinha',1,'cozinha@starinfo.com','123',5),(13,'producao',1,'producao@starinfo.com','123',6),(14,'salao',1,'salao@starinfo.com','123',1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-18 14:04:14
