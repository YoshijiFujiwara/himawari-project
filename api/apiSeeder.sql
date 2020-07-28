-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: api-mysql-srv:3306
-- Generation Time: Jul 28, 2020 at 12:46 PM
-- Server version: 5.7.30
-- PHP Version: 7.4.6
SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET
  time_zone = "+00:00";
  /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
  /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
  /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
  /*!40101 SET NAMES utf8mb4 */;
--
  -- Database: `api`
  --
  -- --------------------------------------------------------
  --
  -- Table structure for table `comments`
  --
  DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
    `id` int(11) NOT NULL,
    `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
    `timeline_id` int(11) NOT NULL,
    `user_id` int(11) NOT NULL,
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
  -- Dumping data for table `comments`
  --
INSERT INTO
  `comments` (
    `id`,
    `content`,
    `timeline_id`,
    `user_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    'すごい！',
    3,
    1,
    '2020-07-28 11:05:14.391349',
    '2020-07-28 11:05:14.391349'
  ),
  (
    2,
    '俺もやらないと',
    2,
    1,
    '2020-07-28 11:05:29.356080',
    '2020-07-28 11:05:29.356080'
  ),
  (
    3,
    'ちょっと何いってるかわからない',
    4,
    2,
    '2020-07-28 11:32:44.221739',
    '2020-07-28 11:32:44.221739'
  ),
  (
    4,
    '俺も頑張るわ',
    3,
    2,
    '2020-07-28 11:35:37.345424',
    '2020-07-28 11:35:37.345424'
  ),
  (
    5,
    'やっていき！',
    2,
    2,
    '2020-07-28 11:35:46.302707',
    '2020-07-28 11:35:46.302707'
  ),
  (
    6,
    'えらいぞ',
    1,
    1,
    '2020-07-28 11:36:20.028855',
    '2020-07-28 11:36:20.028855'
  ),
  (
    7,
    'やり直し大事',
    5,
    4,
    '2020-07-28 11:43:08.748747',
    '2020-07-28 11:43:08.748747'
  ),
  (
    8,
    '俺もやろう',
    6,
    4,
    '2020-07-28 11:43:21.047639',
    '2020-07-28 11:43:21.047639'
  ),
  (
    9,
    'えらい！',
    7,
    4,
    '2020-07-28 11:43:32.867919',
    '2020-07-28 11:43:32.867919'
  ),
  (
    10,
    'いいっすね',
    8,
    3,
    '2020-07-28 11:44:09.144681',
    '2020-07-28 11:44:09.144681'
  ),
  (
    11,
    'ありがとう！',
    7,
    3,
    '2020-07-28 11:44:25.507921',
    '2020-07-28 11:44:25.507921'
  ),
  (
    12,
    'わかる',
    5,
    3,
    '2020-07-28 11:44:43.640551',
    '2020-07-28 11:44:43.640551'
  ),
  (
    13,
    'なんでだよ',
    4,
    1,
    '2020-07-28 11:46:27.648119',
    '2020-07-28 11:46:27.648119'
  ),
  (
    14,
    'おめでとう！',
    9,
    2,
    '2020-07-28 12:12:46.546865',
    '2020-07-28 12:12:46.546865'
  );
-- --------------------------------------------------------
  --
  -- Table structure for table `commits`
  --
  DROP TABLE IF EXISTS `commits`;
CREATE TABLE `commits` (
    `id` int(11) NOT NULL,
    `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `study_time` time NOT NULL,
    `goal_id` int(11) NOT NULL,
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
  -- Dumping data for table `commits`
  --
INSERT INTO
  `commits` (
    `id`,
    `title`,
    `description`,
    `study_time`,
    `goal_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-04-01 10:11:08.186944',
    '2020-07-28 10:12:48.740406'
  ),
  (
    2,
    'チャート式５問',
    '',
    '01:30:00',
    1,
    '2020-04-03 10:11:08.186944',
    '2020-07-28 10:17:07.590037'
  ),
  (
    3,
    'チャート式５問',
    '',
    '02:01:00',
    1,
    '2020-04-09 10:11:08.186944',
    '2020-07-28 10:17:21.688864'
  ),
  (
    4,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-04-12 10:11:08.186944',
    '2020-07-28 10:14:07.948247'
  ),
  (
    5,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-04-16 10:11:08.186944',
    '2020-07-28 10:14:12.728725'
  ),
  (
    6,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-04-18 10:11:08.186944',
    '2020-07-28 10:14:17.098357'
  ),
  (
    7,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-04-21 10:11:08.186944',
    '2020-07-28 10:14:30.369141'
  ),
  (
    8,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-04-25 10:11:08.186944',
    '2020-07-28 10:14:34.671959'
  ),
  (
    9,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-04-28 10:11:08.186944',
    '2020-07-28 10:14:38.405436'
  ),
  (
    10,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-04-30 10:11:08.186944',
    '2020-07-28 10:14:42.240321'
  ),
  (
    11,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-05-02 10:11:08.186944',
    '2020-07-28 10:14:45.544336'
  ),
  (
    12,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-05-05 10:11:08.186944',
    '2020-07-28 10:14:49.361915'
  ),
  (
    13,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-05-08 10:11:08.186944',
    '2020-07-28 10:14:53.330343'
  ),
  (
    14,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-05-11 10:11:08.186944',
    '2020-07-28 10:14:59.183935'
  ),
  (
    15,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-05-14 10:11:08.186944',
    '2020-07-28 10:15:03.072476'
  ),
  (
    16,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-05-16 10:11:08.186944',
    '2020-07-28 10:15:06.838281'
  ),
  (
    17,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-05-18 10:11:08.186944',
    '2020-07-28 10:15:13.473465'
  ),
  (
    18,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-05-21 10:11:08.186944',
    '2020-07-28 10:15:16.497997'
  ),
  (
    19,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-05-23 10:11:08.186944',
    '2020-07-28 10:15:21.079063'
  ),
  (
    20,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-05-26 10:11:08.186944',
    '2020-07-28 10:15:28.746831'
  ),
  (
    21,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-05-29 10:11:08.186944',
    '2020-07-28 10:15:37.613914'
  ),
  (
    22,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-06-02 10:11:08.186944',
    '2020-07-28 10:15:41.491566'
  ),
  (
    23,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-06-04 10:11:08.186944',
    '2020-07-28 10:15:48.029751'
  ),
  (
    24,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-06-06 10:11:08.186944',
    '2020-07-28 10:15:51.016337'
  ),
  (
    25,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-06-10 10:11:08.186944',
    '2020-07-28 10:15:55.553013'
  ),
  (
    26,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-06-16 10:11:08.186944',
    '2020-07-28 10:16:18.959442'
  ),
  (
    27,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-06-20 10:11:08.186944',
    '2020-07-28 10:16:24.890037'
  ),
  (
    28,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-06-24 10:11:08.186944',
    '2020-07-28 10:16:28.793056'
  ),
  (
    29,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-06-27 10:11:08.186944',
    '2020-07-28 10:16:34.526214'
  ),
  (
    30,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-06-30 10:11:08.186944',
    '2020-07-28 10:16:39.756941'
  ),
  (
    31,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-07-02 10:11:08.186944',
    '2020-07-28 10:16:47.125651'
  ),
  (
    32,
    'チャート式５問',
    '',
    '01:01:00',
    1,
    '2020-07-17 10:11:08.186944',
    '2020-07-28 10:16:49.688205'
  ),
  (
    33,
    'リスニング',
    '',
    '01:00:00',
    2,
    '2020-04-03 10:26:31.676061',
    '2020-07-28 10:27:40.395422'
  ),
  (
    34,
    '英作文',
    '',
    '01:05:00',
    2,
    '2020-04-15 10:26:47.684928',
    '2020-07-28 10:27:46.623820'
  ),
  (
    35,
    'リスニング',
    '',
    '01:00:00',
    2,
    '2020-04-18 10:26:31.676061',
    '2020-07-28 10:27:52.198199'
  ),
  (
    36,
    '英作文',
    '',
    '01:05:00',
    2,
    '2020-04-20 10:26:47.684928',
    '2020-07-28 10:27:56.761475'
  ),
  (
    37,
    'リスニング',
    '',
    '01:00:00',
    2,
    '2020-04-25 10:26:31.676061',
    '2020-07-28 10:28:01.323199'
  ),
  (
    38,
    '英作文',
    '',
    '01:05:00',
    2,
    '2020-04-27 10:26:47.684928',
    '2020-07-28 10:28:05.391737'
  ),
  (
    39,
    'リスニング',
    '',
    '01:00:00',
    2,
    '2020-05-06 10:26:31.676061',
    '2020-07-28 10:28:09.717380'
  ),
  (
    40,
    'リスニング',
    '',
    '01:00:00',
    2,
    '2020-05-11 10:26:31.676061',
    '2020-07-28 10:28:15.051242'
  ),
  (
    41,
    '英作文',
    '',
    '01:05:00',
    2,
    '2020-05-13 10:26:47.684928',
    '2020-07-28 10:28:19.443709'
  ),
  (
    42,
    'リスニング',
    '',
    '01:00:00',
    2,
    '2020-05-20 10:26:31.676061',
    '2020-07-28 10:28:23.178981'
  ),
  (
    43,
    '英作文',
    '',
    '01:05:00',
    2,
    '2020-05-25 10:26:47.684928',
    '2020-07-28 10:28:33.449346'
  ),
  (
    44,
    'リスニング',
    '',
    '01:00:00',
    2,
    '2020-05-28 10:26:31.676061',
    '2020-07-28 10:28:37.663038'
  ),
  (
    45,
    '英作文',
    '',
    '01:05:00',
    2,
    '2020-06-10 10:26:47.684928',
    '2020-07-28 10:28:42.663500'
  ),
  (
    46,
    'リスニング',
    '',
    '01:00:00',
    2,
    '2020-06-18 10:26:31.676061',
    '2020-07-28 10:28:46.110172'
  ),
  (
    47,
    'リスニング',
    '',
    '01:00:00',
    2,
    '2020-07-01 10:26:31.676061',
    '2020-07-28 10:29:15.155284'
  ),
  (
    48,
    'リスニング',
    '',
    '01:00:00',
    2,
    '2020-07-15 10:26:31.676061',
    '2020-07-28 10:29:19.499678'
  ),
  (
    49,
    '問題集',
    '',
    '02:04:00',
    3,
    '2019-12-04 10:30:28.576138',
    '2020-07-28 10:39:57.528269'
  ),
  (
    50,
    '過去問',
    '',
    '01:05:00',
    3,
    '2020-01-10 10:30:37.674861',
    '2020-07-28 10:33:23.684723'
  ),
  (
    51,
    '化学',
    '',
    '01:03:00',
    3,
    '2020-02-04 10:30:47.882576',
    '2020-07-28 10:33:29.154247'
  ),
  (
    52,
    '物理',
    '',
    '02:00:00',
    3,
    '2020-02-06 10:31:01.384413',
    '2020-07-28 10:33:34.554414'
  ),
  (
    53,
    '生物',
    '',
    '03:04:00',
    3,
    '2020-02-06 10:31:01.384413',
    '2020-07-28 10:33:41.730308'
  ),
  (
    54,
    '歴史',
    '',
    '01:00:00',
    3,
    '2020-02-06 10:31:01.384413',
    '2020-07-28 10:33:43.324126'
  ),
  (
    55,
    '公民',
    '',
    '03:00:00',
    3,
    '2020-02-06 10:31:01.384413',
    '2020-07-28 10:33:44.712996'
  ),
  (
    56,
    '問題集',
    '',
    '02:04:00',
    3,
    '2020-02-06 10:31:01.384413',
    '2020-07-28 10:33:46.113372'
  ),
  (
    57,
    '過去問',
    '',
    '01:05:00',
    3,
    '2020-03-03 10:30:37.674861',
    '2020-07-28 10:33:52.307510'
  ),
  (
    58,
    '化学',
    '',
    '01:03:00',
    3,
    '2020-03-11 10:30:47.882576',
    '2020-07-28 10:34:26.124181'
  ),
  (
    59,
    '物理',
    '',
    '02:00:00',
    3,
    '2020-03-20 10:31:01.384413',
    '2020-07-28 10:34:30.918652'
  ),
  (
    60,
    '生物',
    '',
    '03:04:00',
    3,
    '2020-03-30 10:31:09.904037',
    '2020-07-28 10:34:36.377369'
  ),
  (
    61,
    '歴史',
    '',
    '01:00:00',
    3,
    '2020-04-01 10:31:25.422205',
    '2020-07-28 10:36:32.393677'
  ),
  (
    62,
    '公民',
    '',
    '03:00:00',
    3,
    '2020-04-10 10:31:33.989301',
    '2020-07-28 10:36:35.876497'
  ),
  (
    63,
    '問題集',
    '',
    '02:04:00',
    3,
    '2020-04-15 10:30:28.576138',
    '2020-07-28 10:36:40.297212'
  ),
  (
    64,
    '過去問',
    '',
    '01:05:00',
    3,
    '2020-04-17 10:30:37.674861',
    '2020-07-28 10:36:44.497648'
  ),
  (
    65,
    '化学',
    '',
    '01:03:00',
    3,
    '2020-04-20 10:30:47.882576',
    '2020-07-28 10:36:48.348055'
  ),
  (
    66,
    '物理',
    '',
    '02:00:00',
    3,
    '2020-04-28 10:31:01.384413',
    '2020-07-28 10:36:51.880408'
  ),
  (
    67,
    '生物',
    '',
    '03:04:00',
    3,
    '2020-04-29 10:31:09.904037',
    '2020-07-28 10:37:00.203420'
  ),
  (
    68,
    '歴史',
    '',
    '01:00:00',
    3,
    '2020-05-06 10:31:25.422205',
    '2020-07-28 10:37:03.308709'
  ),
  (
    69,
    '公民',
    '',
    '03:00:00',
    3,
    '2020-05-14 10:31:33.989301',
    '2020-07-28 10:37:07.868382'
  ),
  (
    70,
    '問題集',
    '',
    '02:04:00',
    3,
    '2020-05-21 10:30:28.576138',
    '2020-07-28 10:37:11.602376'
  ),
  (
    71,
    '過去問',
    '',
    '01:05:00',
    3,
    '2020-05-22 10:30:37.674861',
    '2020-07-28 10:37:16.413592'
  ),
  (
    72,
    '化学',
    '',
    '01:03:00',
    3,
    '2020-05-25 10:30:47.882576',
    '2020-07-28 10:37:20.815103'
  ),
  (
    73,
    '物理',
    '',
    '02:00:00',
    3,
    '2020-05-27 10:31:01.384413',
    '2020-07-28 10:37:27.212826'
  ),
  (
    74,
    '生物',
    '',
    '03:04:00',
    3,
    '2020-05-29 10:31:09.904037',
    '2020-07-28 10:37:31.205404'
  ),
  (
    75,
    '歴史',
    '',
    '01:00:00',
    3,
    '2020-06-10 10:31:25.422205',
    '2020-07-28 10:37:35.909447'
  ),
  (
    76,
    '公民',
    '',
    '03:00:00',
    3,
    '2020-07-15 10:31:33.989301',
    '2020-07-28 10:37:38.387944'
  ),
  (
    77,
    '英語',
    '',
    '01:59:00',
    4,
    '2019-09-02 10:42:19.559647',
    '2020-07-28 10:43:38.367518'
  ),
  (
    78,
    '数学',
    '',
    '02:05:00',
    4,
    '2019-09-18 10:42:28.371790',
    '2020-07-28 10:43:47.495226'
  ),
  (
    79,
    '化学',
    '',
    '02:14:00',
    4,
    '2019-09-21 10:42:38.334566',
    '2020-07-28 10:43:54.625702'
  ),
  (
    80,
    '地理',
    '',
    '03:15:00',
    4,
    '2019-09-22 10:42:46.984526',
    '2020-07-28 10:44:01.803101'
  ),
  (
    81,
    '英語',
    '',
    '01:59:00',
    4,
    '2019-10-15 10:42:19.559647',
    '2020-07-28 10:44:09.572457'
  ),
  (
    82,
    '数学',
    '',
    '02:05:00',
    4,
    '2019-10-18 10:42:28.371790',
    '2020-07-28 10:44:15.659249'
  ),
  (
    83,
    '化学',
    '',
    '02:14:00',
    4,
    '2019-10-22 10:42:38.334566',
    '2020-07-28 10:44:24.081688'
  ),
  (
    84,
    '地理',
    '',
    '03:15:00',
    4,
    '2019-10-23 10:42:46.984526',
    '2020-07-28 10:44:38.048419'
  ),
  (
    85,
    '英語',
    '',
    '01:59:00',
    4,
    '2019-10-25 10:42:19.559647',
    '2020-07-28 10:44:45.376449'
  ),
  (
    86,
    '数学',
    '',
    '02:05:00',
    4,
    '2019-10-26 10:42:28.371790',
    '2020-07-28 10:44:52.545396'
  ),
  (
    87,
    '化学',
    '',
    '02:14:00',
    4,
    '2019-10-28 10:42:38.334566',
    '2020-07-28 10:45:00.090652'
  ),
  (
    88,
    '地理',
    '',
    '03:15:00',
    4,
    '2019-10-31 10:42:46.984526',
    '2020-07-28 10:45:08.134730'
  ),
  (
    89,
    '英語',
    '',
    '01:59:00',
    4,
    '2019-11-02 10:42:19.559647',
    '2020-07-28 10:45:17.442124'
  ),
  (
    90,
    '数学',
    '',
    '02:05:00',
    4,
    '2019-11-10 10:42:28.371790',
    '2020-07-28 10:45:23.591557'
  ),
  (
    91,
    '化学',
    '',
    '02:14:00',
    4,
    '2019-11-13 10:42:38.334566',
    '2020-07-28 10:45:30.631434'
  ),
  (
    92,
    '地理',
    '',
    '03:15:00',
    4,
    '2019-11-22 10:42:46.984526',
    '2020-07-28 10:45:39.649574'
  ),
  (
    93,
    'ポモドーロテクニックを使用した学習',
    '',
    '00:16:00',
    5,
    '2020-07-28 11:02:13.729077',
    '2020-07-28 11:02:13.729077'
  ),
  (
    94,
    '理科の勉強をします',
    '',
    '02:00:00',
    5,
    '2020-07-28 11:02:40.324952',
    '2020-07-28 11:02:40.324952'
  ),
  (
    95,
    '数学の過去問をやります',
    '',
    '03:16:00',
    5,
    '2020-07-28 11:02:51.053515',
    '2020-07-28 11:02:51.053515'
  ),
  (
    96,
    '公民の勉強もします',
    '',
    '03:15:00',
    5,
    '2020-07-28 11:03:03.227641',
    '2020-07-28 11:03:03.227641'
  ),
  (
    97,
    '前回のテストのやり直し',
    '',
    '03:59:00',
    3,
    '2020-07-28 11:04:38.348458',
    '2020-07-28 11:04:38.348458'
  ),
  (
    98,
    '模試の復習',
    '',
    '03:14:00',
    6,
    '2020-07-28 11:39:08.143759',
    '2020-07-28 11:39:08.143759'
  ),
  (
    99,
    '学校の実力テストの復習',
    '',
    '02:06:00',
    6,
    '2020-07-28 11:40:24.293808',
    '2020-07-28 11:40:24.293808'
  ),
  (
    100,
    '前回の模試の復習',
    '',
    '02:04:00',
    7,
    '2020-07-28 11:41:50.175371',
    '2020-07-28 11:41:50.175371'
  ),
  (
    101,
    'リスニング',
    '',
    '02:10:00',
    7,
    '2020-07-28 11:42:35.211169',
    '2020-07-28 11:42:35.211169'
  ),
  (
    102,
    'progate',
    'progateの学習コースⅠ,Ⅱをやった！',
    '02:00:00',
    8,
    '2020-07-21 00:20:09.315963',
    '2020-07-21 00:20:09.315963'
  ),
  (
    103,
    'progate',
    'progateの学習コースⅢ,Ⅳをやった！',
    '02:00:00',
    8,
    '2020-07-21 00:20:48.241798',
    '2020-07-21 00:20:48.241798'
  ),
  (
    104,
    'progate',
    '学習コースⅤをやった！',
    '01:00:00',
    8,
    '2020-07-21 00:21:17.085806',
    '2020-07-21 00:21:17.085806'
  ),
  (
    105,
    'youtube',
    '「超TypeScript入門完全パック(2020)」という動画をみて勉強。\nあと3時間ちょっと残っている。',
    '00:30:00',
    2,
    '2020-07-21 00:26:24.380974',
    '2020-07-21 00:26:24.380974'
  ),
  (
    106,
    '過去問',
    '',
    '00:31:00',
    11,
    '2020-07-21 00:40:44.000299',
    '2020-07-21 00:40:44.000299'
  ),
  (
    107,
    '過去問',
    '計算問題全然覚えていない...',
    '01:01:00',
    11,
    '2020-07-21 00:41:07.166890',
    '2020-07-21 00:41:07.166890'
  ),
  (
    108,
    '過去問',
    '50問中\r\n正答率 40%',
    '01:00:00',
    11,
    '2020-07-21 00:42:03.183621',
    '2020-07-21 00:42:20.643852'
  ),
  (
    109,
    '過去問',
    '75問中\n正答率50%',
    '01:30:00',
    11,
    '2020-07-21 00:43:30.991906',
    '2020-07-21 00:43:30.991906'
  ),
  (
    110,
    '数Ⅱ',
    '教科書のP.67 ~ 72までやった\n',
    '01:04:00',
    13,
    '2020-07-21 00:52:30.438480',
    '2020-07-21 00:52:30.438480'
  ),
  (
    111,
    '過去問',
    '',
    '00:31:00',
    12,
    '2020-07-21 00:53:16.388051',
    '2020-07-21 00:53:16.388051'
  ),
  (
    112,
    '復習',
    '',
    '01:01:00',
    13,
    '2020-07-21 00:55:33.517604',
    '2020-07-21 00:55:33.517604'
  ),
  (
    113,
    '過去問',
    '',
    '01:00:00',
    12,
    '2020-07-21 00:56:36.156216',
    '2020-07-21 00:56:36.156216'
  );
-- --------------------------------------------------------
  --
  -- Table structure for table `goals`
  --
  DROP TABLE IF EXISTS `goals`;
CREATE TABLE `goals` (
    `id` int(11) NOT NULL,
    `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `description` text COLLATE utf8mb4_unicode_ci,
    `label` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `is_public` tinyint(4) NOT NULL DEFAULT '0',
    `user_id` int(11) NOT NULL,
    `last_commited_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
  -- Dumping data for table `goals`
  --
INSERT INTO
  `goals` (
    `id`,
    `title`,
    `description`,
    `label`,
    `is_public`,
    `user_id`,
    `last_commited_at`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    '期末試験の数学で80点とる',
    'でないと、お小遣いが減ってしまう',
    'ACHIEVEMENT',
    1,
    1,
    '2020-07-28 12:11:32.000000',
    '2020-04-01 10:11:08.205380',
    '2020-07-28 12:11:32.166257'
  ),
  (
    2,
    '期末試験の英語で70点以上とる',
    '小遣いUP',
    'CHALLENGING',
    1,
    1,
    '2020-07-28 10:26:47.695000',
    '2020-07-28 10:07:36.489856',
    '2020-07-28 10:26:47.700694'
  ),
  (
    3,
    '実力テストで学内30位以内に入る',
    '',
    'CHALLENGING',
    1,
    1,
    '2020-07-28 11:04:38.365000',
    '2020-07-28 10:08:15.025048',
    '2020-07-28 11:04:38.387912'
  ),
  (
    4,
    '中間試験で平均点60点達成',
    'でないと、お小遣いが減ってしまう',
    'ACHIEVEMENT',
    1,
    1,
    '2020-06-24 10:42:46.993000',
    '2020-07-28 10:41:59.911587',
    '2020-07-28 10:46:31.431714'
  ),
  (
    5,
    '期末試験で今回も首席とる',
    '楽勝だが',
    'CHALLENGING',
    1,
    2,
    '2020-07-28 11:03:03.235000',
    '2020-07-28 11:01:42.396183',
    '2020-07-28 11:03:03.243453'
  ),
  (
    6,
    '東大合格',
    '',
    'CHALLENGING',
    1,
    3,
    '2020-07-28 11:40:24.304000',
    '2020-07-28 11:38:41.284995',
    '2020-07-28 11:40:24.313085'
  ),
  (
    7,
    '全国模試A判定とる',
    '',
    'CHALLENGING',
    1,
    4,
    '2020-07-28 11:42:35.224000',
    '2020-07-28 11:41:32.510372',
    '2020-07-28 11:42:35.239572'
  ),
  (
    8,
    'JSを理解する',
    '打倒NestJS',
    'CHALLENGING',
    1,
    5,
    '2020-07-21 00:21:17.103000',
    '2020-07-21 00:19:09.998959',
    '2020-07-21 00:21:17.112864'
  ),
  (
    9,
    'TypeScriptを理解する',
    '妥当NestJS',
    'CHALLENGING',
    1,
    5,
    '2020-07-21 00:26:24.489000',
    '2020-07-21 00:21:42.018681',
    '2020-07-21 00:26:24.513449'
  ),
  (
    10,
    'NestJSを理解する',
    '',
    'CHALLENGING',
    1,
    5,
    '2020-07-21 00:24:22.635431',
    '2020-07-21 00:24:22.635431',
    '2020-07-21 00:24:22.635431'
  ),
  (
    11,
    'ITパスポート取得',
    '',
    'CHALLENGING',
    0,
    6,
    '2020-07-21 00:43:31.013000',
    '2020-07-21 00:40:20.731654',
    '2020-07-21 00:43:31.027389'
  ),
  (
    12,
    '基本情報取得',
    '',
    'CHALLENGING',
    0,
    6,
    '2020-07-21 00:56:36.185000',
    '2020-07-21 00:44:32.456377',
    '2020-07-21 00:56:36.216781'
  ),
  (
    13,
    'テスト勉強',
    '高得点取る',
    'CHALLENGING',
    0,
    7,
    '2020-07-21 00:55:33.553000',
    '2020-07-21 00:51:10.844599',
    '2020-07-21 00:55:33.561312'
  );
-- --------------------------------------------------------
  --
  -- Table structure for table `goal_group`
  --
  DROP TABLE IF EXISTS `goal_group`;
CREATE TABLE `goal_group` (
    `goal_id` int(11) NOT NULL,
    `group_id` int(11) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
  -- Dumping data for table `goal_group`
  --
INSERT INTO
  `goal_group` (`goal_id`, `group_id`)
VALUES
  (1, 1),
  (2, 1),
  (3, 1),
  (3, 2),
  (4, 1),
  (5, 1),
  (6, 2),
  (7, 2),
  (8, 3),
  (9, 3),
  (11, 3),
  (12, 4),
  (13, 3),
  (13, 4);
-- --------------------------------------------------------
  --
  -- Table structure for table `groups`
  --
  DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
    `id` int(11) NOT NULL,
    `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `last_timeline_posted_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
  -- Dumping data for table `groups`
  --
INSERT INTO
  `groups` (
    `id`,
    `name`,
    `created_at`,
    `updated_at`,
    `last_timeline_posted_at`
  )
VALUES
  (
    1,
    '学校なかま',
    '2020-07-28 10:47:24.038577',
    '2020-07-28 12:11:32.000000',
    '2020-07-28 12:11:32.206000'
  ),
  (
    2,
    '塾なかま',
    '2020-07-28 10:47:42.848435',
    '2020-07-28 11:42:35.000000',
    '2020-07-28 11:42:35.268000'
  ),
  (
    3,
    'ひまわり組',
    '2020-07-21 00:23:58.231417',
    '2020-07-21 00:23:58.231417',
    '2020-07-28 12:33:04.159824'
  ),
  (
    4,
    '和牛組',
    '2020-07-21 00:51:44.354819',
    '2020-07-28 12:39:20.059717',
    '2020-07-28 12:33:04.159824'
  ),
  (
    5,
    '中学の友達',
    '2020-07-28 12:40:48.087571',
    '2020-07-28 12:40:48.087571',
    '2020-07-28 12:40:48.087571'
  );
-- --------------------------------------------------------
  --
  -- Table structure for table `reactions`
  --
  DROP TABLE IF EXISTS `reactions`;
CREATE TABLE `reactions` (
    `id` int(11) NOT NULL,
    `timeline_id` int(11) NOT NULL,
    `emoji` enum('GOOD', 'BAD', 'SMILE', 'PIEN', 'POPPER') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'GOOD',
    `user_id` int(11) NOT NULL,
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
  -- Dumping data for table `reactions`
  --
INSERT INTO
  `reactions` (
    `id`,
    `timeline_id`,
    `emoji`,
    `user_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    3,
    'GOOD',
    1,
    '2020-07-28 11:04:51.096430',
    '2020-07-28 11:04:51.096430'
  ),
  (
    2,
    2,
    'POPPER',
    1,
    '2020-07-28 11:04:53.423450',
    '2020-07-28 11:04:53.423450'
  ),
  (
    3,
    1,
    'SMILE',
    1,
    '2020-07-28 11:04:56.380903',
    '2020-07-28 11:04:56.380903'
  ),
  (
    4,
    2,
    'POPPER',
    2,
    '2020-07-28 11:35:21.983505',
    '2020-07-28 11:35:21.983505'
  ),
  (
    5,
    4,
    'PIEN',
    1,
    '2020-07-28 11:37:27.028388',
    '2020-07-28 11:37:27.028388'
  ),
  (
    6,
    5,
    'SMILE',
    4,
    '2020-07-28 11:42:43.596966',
    '2020-07-28 11:42:43.596966'
  ),
  (
    7,
    5,
    'PIEN',
    4,
    '2020-07-28 11:42:45.238578',
    '2020-07-28 11:42:45.238578'
  ),
  (
    8,
    6,
    'POPPER',
    4,
    '2020-07-28 11:42:47.052653',
    '2020-07-28 11:42:47.052653'
  ),
  (
    9,
    7,
    'POPPER',
    4,
    '2020-07-28 11:42:51.004266',
    '2020-07-28 11:42:51.004266'
  ),
  (
    10,
    8,
    'GOOD',
    4,
    '2020-07-28 11:42:53.202699',
    '2020-07-28 11:42:53.202699'
  ),
  (
    11,
    8,
    'GOOD',
    3,
    '2020-07-28 11:43:59.354881',
    '2020-07-28 11:43:59.354881'
  ),
  (
    12,
    5,
    'PIEN',
    3,
    '2020-07-28 11:44:33.894231',
    '2020-07-28 11:44:33.894231'
  ),
  (
    13,
    5,
    'POPPER',
    3,
    '2020-07-28 11:44:37.250569',
    '2020-07-28 11:44:37.250569'
  ),
  (
    14,
    8,
    'GOOD',
    1,
    '2020-07-28 11:57:12.698789',
    '2020-07-28 11:57:12.698789'
  ),
  (
    16,
    7,
    'GOOD',
    1,
    '2020-07-28 11:57:22.280349',
    '2020-07-28 11:57:22.280349'
  ),
  (
    17,
    7,
    'PIEN',
    1,
    '2020-07-28 11:57:24.848647',
    '2020-07-28 11:57:24.848647'
  ),
  (
    18,
    6,
    'PIEN',
    1,
    '2020-07-28 11:57:31.328520',
    '2020-07-28 11:57:31.328520'
  ),
  (
    19,
    9,
    'POPPER',
    1,
    '2020-07-28 12:12:01.505817',
    '2020-07-28 12:12:01.505817'
  ),
  (
    20,
    9,
    'GOOD',
    1,
    '2020-07-28 12:12:02.854699',
    '2020-07-28 12:12:02.854699'
  ),
  (
    21,
    9,
    'POPPER',
    2,
    '2020-07-28 12:12:37.224838',
    '2020-07-28 12:12:37.224838'
  ),
  (
    22,
    9,
    'GOOD',
    2,
    '2020-07-28 12:12:37.705367',
    '2020-07-28 12:12:37.705367'
  );
-- --------------------------------------------------------
  --
  -- Table structure for table `tasks`
  --
  DROP TABLE IF EXISTS `tasks`;
CREATE TABLE `tasks` (
    `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `user_id` int(11) NOT NULL,
    `id` int(11) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- --------------------------------------------------------
  --
  -- Table structure for table `timelines`
  --
  DROP TABLE IF EXISTS `timelines`;
CREATE TABLE `timelines` (
    `group_id` int(11) NOT NULL,
    `type` enum('COMMIT_CREATED', 'GOAL_STATUS_UPDATED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'COMMIT_CREATED',
    `commit_id` int(11) DEFAULT NULL,
    `goal_id` int(11) DEFAULT NULL,
    `from_label` enum('CHALLENGING', 'ACHIEVEMENT', 'GIVE_UP') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `to_label` enum('CHALLENGING', 'ACHIEVEMENT', 'GIVE_UP') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `id` int(11) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
  -- Dumping data for table `timelines`
  --
INSERT INTO
  `timelines` (
    `group_id`,
    `type`,
    `commit_id`,
    `goal_id`,
    `from_label`,
    `to_label`,
    `created_at`,
    `updated_at`,
    `id`
  )
VALUES
  (
    1,
    'COMMIT_CREATED',
    94,
    NULL,
    NULL,
    NULL,
    '2020-07-28 11:02:40.364330',
    '2020-07-28 11:02:40.364330',
    1
  ),
  (
    1,
    'COMMIT_CREATED',
    95,
    NULL,
    NULL,
    NULL,
    '2020-07-28 11:02:51.102767',
    '2020-07-28 11:02:51.102767',
    2
  ),
  (
    1,
    'COMMIT_CREATED',
    96,
    NULL,
    NULL,
    NULL,
    '2020-07-28 11:03:03.267601',
    '2020-07-28 11:03:03.267601',
    3
  ),
  (
    1,
    'COMMIT_CREATED',
    97,
    NULL,
    NULL,
    NULL,
    '2020-07-28 11:04:38.419740',
    '2020-07-28 11:04:38.419740',
    4
  ),
  (
    2,
    'COMMIT_CREATED',
    97,
    NULL,
    NULL,
    NULL,
    '2020-07-28 11:04:38.420416',
    '2020-07-28 11:04:38.420416',
    5
  ),
  (
    2,
    'COMMIT_CREATED',
    98,
    NULL,
    NULL,
    NULL,
    '2020-07-28 11:39:08.196238',
    '2020-07-28 11:39:08.196238',
    6
  ),
  (
    2,
    'COMMIT_CREATED',
    99,
    NULL,
    NULL,
    NULL,
    '2020-07-28 11:40:24.331742',
    '2020-07-28 11:40:24.331742',
    7
  ),
  (
    2,
    'COMMIT_CREATED',
    101,
    NULL,
    NULL,
    NULL,
    '2020-07-28 11:42:35.268306',
    '2020-07-28 11:42:35.268306',
    8
  ),
  (
    1,
    'GOAL_STATUS_UPDATED',
    NULL,
    1,
    'CHALLENGING',
    'ACHIEVEMENT',
    '2020-07-28 12:11:32.206921',
    '2020-07-28 12:11:32.206921',
    9
  );
-- --------------------------------------------------------
  --
  -- Table structure for table `users`
  --
  DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` int(11) NOT NULL,
    `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `avatar_url` text COLLATE utf8mb4_unicode_ci,
    `status_message` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `third_party_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `auth_provider` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `is_email_verified` tinyint(4) NOT NULL DEFAULT '0',
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
  -- Dumping data for table `users`
  --
INSERT INTO
  `users` (
    `id`,
    `username`,
    `email`,
    `password`,
    `avatar_url`,
    `status_message`,
    `third_party_id`,
    `auth_provider`,
    `is_email_verified`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    '伊達みきお',
    'date@example.com',
    '$2b$10$UnLcDMfbIQhhWzQv6RsIS.6FMZRfr6T0wlSW8.gkpLBdgMfIqYvRy',
    'http://res.cloudinary.com/db32y726v/image/upload/v1595933749/utug2gtrgilt27lziek9.jpg',
    '',
    NULL,
    NULL,
    1,
    '2020-07-28 10:02:37.089567',
    '2020-07-28 10:55:49.000000'
  ),
  (
    2,
    '富沢タケシ',
    'tomi@example.com',
    '$2b$10$VKTrISDa0cjUPrtO4P4dleSYnYkogxTQTXLr.O2/1zOXGZ4zaGxOG',
    'http://res.cloudinary.com/db32y726v/image/upload/v1595933784/mr0jlcwagfvnaafdcven.png',
    '',
    NULL,
    NULL,
    1,
    '2020-07-28 10:49:53.710338',
    '2020-07-28 10:56:24.000000'
  ),
  (
    3,
    'はなわのぶゆき',
    'hana@example.com',
    '$2b$10$UnLcDMfbIQhhWzQv6RsIS.6FMZRfr6T0wlSW8.gkpLBdgMfIqYvRy',
    'http://res.cloudinary.com/db32y726v/image/upload/v1595933802/jemcjsxzsqisdralb80c.jpg',
    '',
    NULL,
    NULL,
    1,
    '2020-07-28 10:02:37.089567',
    '2020-07-28 10:56:42.000000'
  ),
  (
    4,
    'つちやのぶゆき',
    'tsuchi@example.com',
    '$2b$10$VKTrISDa0cjUPrtO4P4dleSYnYkogxTQTXLr.O2/1zOXGZ4zaGxOG',
    'http://res.cloudinary.com/db32y726v/image/upload/v1595933831/yr3q5gmqfaync59wryhq.jpg',
    '',
    NULL,
    NULL,
    1,
    '2020-07-28 10:49:53.710338',
    '2020-07-28 10:57:11.000000'
  ),
  (
    5,
    'イモトアヤコ',
    'imoto@example.com',
    '$2b$10$9f2onA7U/M0BTN6HUwwnveTEMDhiFct.P9ZbVumUZiq16/zav5PDy',
    'http://res.cloudinary.com/db32y726v/image/upload/v1595939852/c9g41ttiqzd9oqgzv3gg.jpg',
    '',
    NULL,
    NULL,
    1,
    '2020-07-21 00:15:45.461322',
    '2020-07-28 12:37:32.000000'
  ),
  (
    6,
    '水田信二',
    'mizu@example.com',
    '$2b$10$UyTdYPXElEeAP026VvheiO0eI3WFw7VnwdagXl1prdThYw9cJPx/S',
    'http://res.cloudinary.com/db32y726v/image/upload/v1595939919/v1ogg6o6hfwnicioen3p.jpg',
    '',
    NULL,
    NULL,
    1,
    '2020-07-21 00:16:33.350395',
    '2020-07-28 12:44:56.000000'
  ),
  (
    7,
    '川西賢志郎 ',
    'kawa@example.com',
    '$2b$10$h9CiO6Y1swwdW09me4wKz.haxWkKhc3ucnPUWBINnPLb3jjLVXw7a',
    'http://res.cloudinary.com/db32y726v/image/upload/v1595939869/rkltaudiiyfjo9nmwcqu.jpg',
    '',
    NULL,
    NULL,
    1,
    '2020-07-21 00:17:19.019096',
    '2020-07-28 12:37:49.000000'
  );
-- --------------------------------------------------------
  --
  -- Table structure for table `user_group`
  --
  DROP TABLE IF EXISTS `user_group`;
CREATE TABLE `user_group` (
    `user_id` int(11) NOT NULL,
    `group_id` int(11) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
  -- Dumping data for table `user_group`
  --
INSERT INTO
  `user_group` (`user_id`, `group_id`)
VALUES
  (1, 1),
  (1, 2),
  (1, 5),
  (2, 1),
  (3, 2),
  (4, 2),
  (5, 3),
  (5, 5),
  (6, 3),
  (6, 4),
  (6, 5),
  (7, 3),
  (7, 4),
  (7, 5);
--
  -- Indexes for dumped tables
  --
  --
  -- Indexes for table `comments`
  --
ALTER TABLE
  `comments`
ADD
  PRIMARY KEY (`id`),
ADD
  KEY `FK_4691d31b264af079c3ed4e9bfe0` (`timeline_id`),
ADD
  KEY `FK_4c675567d2a58f0b07cef09c13d` (`user_id`);
--
  -- Indexes for table `commits`
  --
ALTER TABLE
  `commits`
ADD
  PRIMARY KEY (`id`),
ADD
  KEY `FK_f76b45dcea9053d44850d082b69` (`goal_id`);
--
  -- Indexes for table `goals`
  --
ALTER TABLE
  `goals`
ADD
  PRIMARY KEY (`id`),
ADD
  KEY `FK_88b78010581f2d293699d064441` (`user_id`);
--
  -- Indexes for table `goal_group`
  --
ALTER TABLE
  `goal_group`
ADD
  PRIMARY KEY (`goal_id`, `group_id`),
ADD
  KEY `IDX_7465ad3e1524297c213b2f375b` (`goal_id`),
ADD
  KEY `IDX_83eba4ca1dfd547c27add7fe45` (`group_id`);
--
  -- Indexes for table `groups`
  --
ALTER TABLE
  `groups`
ADD
  PRIMARY KEY (`id`);
--
  -- Indexes for table `reactions`
  --
ALTER TABLE
  `reactions`
ADD
  PRIMARY KEY (`id`),
ADD
  KEY `FK_ae5674d7da628f0134db8c935eb` (`timeline_id`),
ADD
  KEY `FK_dde6062145a93649adc5af3946e` (`user_id`);
--
  -- Indexes for table `tasks`
  --
ALTER TABLE
  `tasks`
ADD
  PRIMARY KEY (`id`),
ADD
  KEY `FK_db55af84c226af9dce09487b61b` (`user_id`);
--
  -- Indexes for table `timelines`
  --
ALTER TABLE
  `timelines`
ADD
  PRIMARY KEY (`id`),
ADD
  KEY `FK_6600771bab5eaa490d3480d825d` (`group_id`),
ADD
  KEY `FK_15a25e5ef47ef33f13a610570ac` (`commit_id`),
ADD
  KEY `FK_d29f1b916a1e88d73f03e756c99` (`goal_id`);
--
  -- Indexes for table `users`
  --
ALTER TABLE
  `users`
ADD
  PRIMARY KEY (`id`),
ADD
  UNIQUE KEY `IDX_fe0bb3f6520ee0469504521e71` (`username`),
ADD
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`);
--
  -- Indexes for table `user_group`
  --
ALTER TABLE
  `user_group`
ADD
  PRIMARY KEY (`user_id`, `group_id`),
ADD
  KEY `IDX_7ded8f984bbc2ee6ff0beee491` (`user_id`),
ADD
  KEY `IDX_bb9982562cca83afb76c0ddc0d` (`group_id`);
--
  -- AUTO_INCREMENT for dumped tables
  --
  --
  -- AUTO_INCREMENT for table `comments`
  --
ALTER TABLE
  `comments`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 15;
--
  -- AUTO_INCREMENT for table `commits`
  --
ALTER TABLE
  `commits`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 114;
--
  -- AUTO_INCREMENT for table `goals`
  --
ALTER TABLE
  `goals`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 14;
--
  -- AUTO_INCREMENT for table `groups`
  --
ALTER TABLE
  `groups`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 6;
--
  -- AUTO_INCREMENT for table `reactions`
  --
ALTER TABLE
  `reactions`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 23;
--
  -- AUTO_INCREMENT for table `tasks`
  --
ALTER TABLE
  `tasks`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;
--
  -- AUTO_INCREMENT for table `timelines`
  --
ALTER TABLE
  `timelines`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 10;
--
  -- AUTO_INCREMENT for table `users`
  --
ALTER TABLE
  `users`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 8;
--
  -- Constraints for dumped tables
  --
  --
  -- Constraints for table `comments`
  --
ALTER TABLE
  `comments`
ADD
  CONSTRAINT `FK_4691d31b264af079c3ed4e9bfe0` FOREIGN KEY (`timeline_id`) REFERENCES `timelines` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD
  CONSTRAINT `FK_4c675567d2a58f0b07cef09c13d` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
--
  -- Constraints for table `commits`
  --
ALTER TABLE
  `commits`
ADD
  CONSTRAINT `FK_f76b45dcea9053d44850d082b69` FOREIGN KEY (`goal_id`) REFERENCES `goals` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
--
  -- Constraints for table `goals`
  --
ALTER TABLE
  `goals`
ADD
  CONSTRAINT `FK_88b78010581f2d293699d064441` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
--
  -- Constraints for table `goal_group`
  --
ALTER TABLE
  `goal_group`
ADD
  CONSTRAINT `FK_7465ad3e1524297c213b2f375b5` FOREIGN KEY (`goal_id`) REFERENCES `goals` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD
  CONSTRAINT `FK_83eba4ca1dfd547c27add7fe457` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
--
  -- Constraints for table `reactions`
  --
ALTER TABLE
  `reactions`
ADD
  CONSTRAINT `FK_ae5674d7da628f0134db8c935eb` FOREIGN KEY (`timeline_id`) REFERENCES `timelines` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD
  CONSTRAINT `FK_dde6062145a93649adc5af3946e` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
--
  -- Constraints for table `tasks`
  --
ALTER TABLE
  `tasks`
ADD
  CONSTRAINT `FK_db55af84c226af9dce09487b61b` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
--
  -- Constraints for table `timelines`
  --
ALTER TABLE
  `timelines`
ADD
  CONSTRAINT `FK_15a25e5ef47ef33f13a610570ac` FOREIGN KEY (`commit_id`) REFERENCES `commits` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD
  CONSTRAINT `FK_6600771bab5eaa490d3480d825d` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD
  CONSTRAINT `FK_d29f1b916a1e88d73f03e756c99` FOREIGN KEY (`goal_id`) REFERENCES `goals` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
--
  -- Constraints for table `user_group`
  --
ALTER TABLE
  `user_group`
ADD
  CONSTRAINT `FK_7ded8f984bbc2ee6ff0beee491b` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD
  CONSTRAINT `FK_bb9982562cca83afb76c0ddc0d6` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;
  /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
  /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
  /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;