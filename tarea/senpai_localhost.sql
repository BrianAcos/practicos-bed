/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tareas
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tareas`;
CREATE TABLE `tareas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(200) NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT = 25 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tareas
# ------------------------------------------------------------

INSERT INTO
  `tareas` (`id`, `descripcion`, `avatar`)
VALUES
  (
    1,
    'Mi tarea numero 1',
    '38da23c40dbdc6e803e444362c7f9159'
  );
INSERT INTO
  `tareas` (`id`, `descripcion`, `avatar`)
VALUES
  (2, '', '7a061f38ff0d2c1654e39c20eaec8f80');
INSERT INTO
  `tareas` (`id`, `descripcion`, `avatar`)
VALUES
  (3, 'asdhasdjk', 'cc9ac09dc5bed879e2ad3af1bbfe0b5d');
INSERT INTO
  `tareas` (`id`, `descripcion`, `avatar`)
VALUES
  (
    4,
    'sljhfsdojhfwjkl',
    '92859938fad12af9b8e33db6badd5a94'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
