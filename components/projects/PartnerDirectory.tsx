'use client'
import { useState } from 'react'
import { Search, MapPin } from 'lucide-react'

type IntlPartner = { name: string; country: string }
type DomPartner  = { name: string; city: string; type: string }

const INTL_DATA: IntlPartner[] = [
  {name:'Daffodil International University',country:'Bangladesh'},
  {name:'Southern University Bangladesh',country:'Bangladesh'},
  {name:'Beijing University of Posts and Telecommunication (BUPT)',country:'China'},
  {name:'Hua Qiao University',country:'China'},
  {name:'Yangzhou University',country:'China'},
  {name:'Zhejiang Yuexiu University of Foreign Languages',country:'China'},
  {name:'Anhui University',country:'China'},
  {name:'Chaoshan Vocational and Technical College',country:'China'},
  {name:'Fujian Polytechnic Normal University (FPNU)',country:'China'},
  {name:'Guangdong University of Foreign Studies (GDUFS)',country:'China'},
  {name:'Guangdong University of Science and Technology (GDUT)',country:'China'},
  {name:'Guangxi Normal University',country:'China'},
  {name:'Guangzhou College of Commerce (GCC)',country:'China'},
  {name:'Guangzhou Huanan Business College',country:'China'},
  {name:'Guangzhou Nanyang Polytechnic College',country:'China'},
  {name:'Hunan City University',country:'China'},
  {name:'Nanjing University of Aeronautics and Astronautics (NUAA)',country:'China'},
  {name:'School of Economics, Fudan University',country:'China'},
  {name:'Tianjin Foreign Studies University (TFSU)',country:'China'},
  {name:'University of Saint Joseph',country:'China'},
  {name:"Xi'an Jiaotong-Liverpool University (XJTLU)",country:'China'},
  {name:'Cambodian University for Specialties (CUS)',country:'Cambodia'},
  {name:'National University of Management (NUM)',country:'Cambodia'},
  {name:'Royal University of Phnom Penh (RUPP)',country:'Cambodia'},
  {name:'University of Puthisastra',country:'Cambodia'},
  {name:'University of the Fraser Valley (UFV)',country:'Canada'},
  {name:'Rennes School of Business',country:'France'},
  {name:'Hochschule Fresenius University of Applied Sciences',country:'Germany'},
  {name:'Hochschule Mainz - University of Applied Sciences',country:'Germany'},
  {name:'Osnabrück University of Applied Sciences',country:'Germany'},
  {name:'University of Applied Sciences Darmstadt (h_da)',country:'Germany'},
  {name:'FH Münster University of Applied Sciences',country:'Germany'},
  {name:'Centennial College',country:'Hong Kong'},
  {name:'City University of Hong Kong (CityU)',country:'Hong Kong'},
  {name:'Lingnan University',country:'Hong Kong'},
  {name:'The Education University of Hong Kong',country:'Hong Kong'},
  {name:'Budapest University of Technology and Economics',country:'Hungary'},
  {name:'Assam Down Town University',country:'India'},
  {name:'Lady Doak College',country:'India'},
  {name:'Vellore Institute of Technology (VIT)',country:'India'},
  {name:'VIT Bhopal University',country:'India'},
  {name:'VIT-AP University',country:'India'},
  {name:'Athlone Institute of Technology',country:'Ireland'},
  {name:'Asia University',country:'Japan'},
  {name:'Clark Memorial International High School',country:'Japan'},
  {name:'International Christian University (ICU)',country:'Japan'},
  {name:'International Pacific University (IPU)',country:'Japan'},
  {name:'Josai International University',country:'Japan'},
  {name:'Kaichi International University',country:'Japan'},
  {name:'Kansai Gaidai University',country:'Japan'},
  {name:'Kansai University of International Studies',country:'Japan'},
  {name:'Kwansei Gakuin University',country:'Japan'},
  {name:'Meiji University',country:'Japan'},
  {name:'Momoyama Gakuin University',country:'Japan'},
  {name:'Nihon University',country:'Japan'},
  {name:'Shizuoka University',country:'Japan'},
  {name:'Sophia University',country:'Japan'},
  {name:'University of Niigata Prefecture',country:'Japan'},
  {name:'Mykolas Romeris University',country:'Lithuania'},
  {name:'Macau Millennium College (MMC)',country:'Macau'},
  {name:'Macau University of Science and Technology',country:'Macau'},
  {name:'Asia Pacific University of Technology & Innovation (APU)',country:'Malaysia'},
  {name:'Holiday Inn Melaka',country:'Malaysia'},
  {name:'INTI International University',country:'Malaysia'},
  {name:'Sunway University',country:'Malaysia'},
  {name:'Tunku Abdul Rahman University of Management and Technology (TARUMT)',country:'Malaysia'},
  {name:'UCSI University',country:'Malaysia'},
  {name:'Universiti Malaysia Perlis (UniMAP)',country:'Malaysia'},
  {name:'Universiti Malaysia Sarawak (UNIMAS)',country:'Malaysia'},
  {name:'Universiti Sains Malaysia (USM)',country:'Malaysia'},
  {name:'Universiti Teknologi MARA (UiTM)',country:'Malaysia'},
  {name:'Universiti Tun Hussein Onn Malaysia (UTHM)',country:'Malaysia'},
  {name:'Universiti Tunku Abdul Rahman (UTAR)',country:'Malaysia'},
  {name:'German-Mongolian Institute for Resources and Technology (GMIT)',country:'Mongolia'},
  {name:'Huree University of Information and Communication Technology',country:'Mongolia'},
  {name:'Fontys University of Applied Sciences',country:'Netherlands'},
  {name:'Inholland University of Applied Sciences',country:'Netherlands'},
  {name:'Saxion University of Applied Sciences',country:'Netherlands'},
  {name:'Massey University',country:'New Zealand'},
  {name:'Bicol University',country:'Philippines'},
  {name:'Camarines Sur Polytechnic Colleges',country:'Philippines'},
  {name:'Central Bicol State University of Agriculture San Jose',country:'Philippines'},
  {name:'Central Philippine University',country:'Philippines'},
  {name:'Iloilo Science and Technology University',country:'Philippines'},
  {name:'Northwest Samar State University',country:'Philippines'},
  {name:'Panpacific University',country:'Philippines'},
  {name:'Philippine Christian University',country:'Philippines'},
  {name:'Philippine Normal University',country:'Philippines'},
  {name:'Samar State University',country:'Philippines'},
  {name:'Silliman University',country:'Philippines'},
  {name:'University of Mindanao',country:'Philippines'},
  {name:'University of St. La Salle',country:'Philippines'},
  {name:'University of the East',country:'Philippines'},
  {name:'AGH University of Science and Technology',country:'Poland'},
  {name:'Poznań University of Life Science',country:'Poland'},
  {name:'Lusofona University of Humanities and Technologies',country:'Portugal'},
  {name:'Stefan Cel Mare University of Suceava',country:'Romania'},
  {name:'James Cook University (JCU)',country:'Singapore'},
  {name:'National University of Singapore (NUS)',country:'Singapore'},
  {name:'Ngee Ann Polytechnic (NP)',country:'Singapore'},
  {name:'Singapore University of Technology and Design (SUTD)',country:'Singapore'},
  {name:'Busan Digital University (BDU)',country:'South Korea'},
  {name:'Busan University of Foreign Studies',country:'South Korea'},
  {name:'Changwon National University',country:'South Korea'},
  {name:'Chodang University',country:'South Korea'},
  {name:'Dankook University (DKU)',country:'South Korea'},
  {name:'Dongseo University',country:'South Korea'},
  {name:'Hankuk University of Foreign Studies',country:'South Korea'},
  {name:'Hannam University',country:'South Korea'},
  {name:'Keimyung University',country:'South Korea'},
  {name:'Myongji University',country:'South Korea'},
  {name:'Pusan National University',country:'South Korea'},
  {name:'Sogang Business School, Sogang University',country:'South Korea'},
  {name:'SolBridge International School of Business (Woosong University)',country:'South Korea'},
  {name:'Soongsil University',country:'South Korea'},
  {name:'Woosong University',country:'South Korea'},
  {name:'Yonsei University',country:'South Korea'},
  {name:'International Hotel Management Institute',country:'Switzerland'},
  {name:'Chang Jung Christian University',country:'Taiwan'},
  {name:'Chung Yuan Christian University',country:'Taiwan'},
  {name:'Fu Jen Catholic University',country:'Taiwan'},
  {name:'I-Shou University',country:'Taiwan'},
  {name:'Kun Shan University',country:'Taiwan'},
  {name:'Ming Chuan University',country:'Taiwan'},
  {name:'National Central University',country:'Taiwan'},
  {name:'National Chi Nan University',country:'Taiwan'},
  {name:'National Ilan University',country:'Taiwan'},
  {name:'National Kaohsiung University of Science and Technology (NKUST)',country:'Taiwan'},
  {name:'National Sun Yat-Sen University (NSYSU)',country:'Taiwan'},
  {name:'National Taiwan University of Science and Technology (NTUST)',country:'Taiwan'},
  {name:'Tunghai University',country:'Taiwan'},
  {name:'Wenzao Ursuline University of Languages',country:'Taiwan'},
  {name:'Yuan Ze University Taoyuan',country:'Taiwan'},
  {name:'Bangkok University',country:'Thailand'},
  {name:'Naresuan University',country:'Thailand'},
  {name:'Siam University',country:'Thailand'},
  {name:'Silpakorn University',country:'Thailand'},
  {name:'Srinakharinwirot University (SWU)',country:'Thailand'},
  {name:'Thai-Nichi Institute of Technology',country:'Thailand'},
  {name:"Universidade Nacional Timor Lorosa'e (UNTL)",country:'Timor Leste'},
  {name:'The Emirates Academy of Hospitality Management',country:'United Arab Emirates'},
  {name:'Coventry University',country:'United Kingdom'},
  {name:'Loughborough University',country:'United Kingdom'},
  {name:'University of Chichester',country:'United Kingdom'},
  {name:'California Baptist University',country:'United States'},
  {name:'Dallas Baptist University',country:'United States'},
  {name:'Iowa State University of Science and Technology (ISU)',country:'United States'},
  {name:'Valparaiso University (Valpo)',country:'United States'},
  {name:'Macquarie University',country:'Australia'},
  {name:'Monash University',country:'Australia'},
  {name:'Queensland University of Technology (QUT)',country:'Australia'},
  {name:'RMIT University',country:'Australia'},
  {name:'University of New South Wales (UNSW)',country:'Australia'},
  {name:'University of Tasmania',country:'Australia'},
]

const DOM_DATA: DomPartner[] = [
  {name:'Four Points By Sheraton Surabaya',city:'Surabaya',type:'International'},
  {name:'Hotel DoubleTree by Hilton Surabaya',city:'Surabaya',type:'International'},
  {name:'JW Marriott Hotel Surabaya',city:'Surabaya',type:'International'},
  {name:'PT GoTo Gojek Tokopedia Tbk',city:'Jakarta',type:'National'},
  {name:"PT Rekso Nasional Food (McDonald's)",city:'Jakarta',type:'International'},
  {name:'PT Tokopedia',city:'Jakarta',type:'National'},
  {name:'PT. Graha Alam Lestari (The Apurva Kempinski Bali)',city:'Denpasar',type:'International'},
  {name:'Sheraton Surabaya Hotel',city:'Surabaya',type:'International'},
  {name:'German Academic Exchange Service (DAAD) Indonesia',city:'Jakarta',type:'International'},
  {name:'ICAEW Indonesia',city:'Jakarta',type:'International'},
  {name:'Indoprima Group',city:'Surabaya',type:'National'},
  {name:'Institut Pertanian Bogor (IPB)',city:'Bogor',type:'Education'},
  {name:'Maspion Group',city:'Surabaya',type:'National'},
  {name:'PT Astra Sedaya Finance',city:'Jakarta',type:'National'},
  {name:'PT Bank Pembangunan Daerah Jawa Timur Tbk (Bank Jatim)',city:'Surabaya',type:'National'},
  {name:'PT Erajaya Swasembada Tbk',city:'Jakarta',type:'National'},
  {name:'PT Global Digital Niaga (Blibli)',city:'Jakarta',type:'National'},
  {name:'PT Ishizuka Maspion Indonesia',city:'Surabaya',type:'National'},
  {name:'PT. Bosch Rexroth',city:'Jakarta',type:'International'},
  {name:'PT. Charoen Pokphand Indonesia Tbk — Jawa Timur',city:'Sidoarjo',type:'International'},
  {name:'PT. Semen Indonesia (Persero) Tbk.',city:'Jakarta',type:'National'},
  {name:'Samator Group',city:'Surabaya',type:'National'},
  {name:'Universitas Airlangga',city:'Surabaya',type:'Education'},
  {name:'Universitas Andalas',city:'Sumatera',type:'Education'},
  {name:'Universitas Hasanuddin',city:'Makassar',type:'Education'},
  {name:'Universitas Indonesia',city:'Jakarta',type:'Education'},
  {name:'Universitas Muhammadiyah Malang',city:'Malang',type:'Education'},
  {name:'Universitas Negeri Surabaya (UNESA)',city:'Surabaya',type:'Education'},
  {name:'Universitas Padjadjaran',city:'Sumedang',type:'Education'},
  {name:'Universitas Sebelas Maret',city:'Surakarta',type:'Education'},
  {name:'Wings Group Surabaya',city:'Surabaya',type:'National'},
  {name:'Badan Pengembangan SDM Industri Kemenperin (PIDI)',city:'Jakarta',type:'Government'},
  {name:'Kementerian Pendayagunaan Aparatur Negara dan RB',city:'Jakarta',type:'Government'},
  {name:'Komisi Nasional Disabilitas Republik Indonesia',city:'Jakarta',type:'Government'},
  {name:'Mayapada Hospital',city:'Surabaya',type:'National'},
  {name:'Politeknik Negeri Malang',city:'Malang',type:'Education'},
  {name:'PT Grant Thornton Indonesia',city:'Jakarta',type:'International'},
  {name:'PT Martina Berto Tbk (Marta Tilaar)',city:'Jakarta',type:'National'},
  {name:'PT Rembaka (La Tulipe)',city:'Surabaya',type:'National'},
  {name:'PT Sinarmas Sekuritas',city:'Jakarta',type:'National'},
  {name:'PT. Kosmetika Global Indonesia',city:'Surabaya',type:'National'},
  {name:'PT. Mitra Pinasthika Mulia (MPM)',city:'Surabaya',type:'National'},
  {name:'PT. Transforma Oto Prima (Mercedes-Benz)',city:'Surabaya',type:'International'},
  {name:'PT. Wahana Kosmetika Indonesia',city:'Sidoarjo',type:'National'},
  {name:'RSM Indonesia',city:'Jakarta',type:'International'},
  {name:'Sekretariat Jenderal Kementerian Sosial',city:'Jakarta',type:'Government'},
  {name:'Tentara Nasional Indonesia AL (STTAL)',city:'Surabaya',type:'Government'},
  {name:'Universitas Atma Jaya Yogyakarta',city:'Yogyakarta',type:'Education'},
  {name:'Universitas Bina Nusantara',city:'Jakarta',type:'Education'},
  {name:'Universitas Islam Indonesia',city:'Yogyakarta',type:'Education'},
  {name:'Universitas Islam Sultan Agung',city:'Semarang',type:'Education'},
  {name:'Universitas Jember',city:'Jember',type:'Education'},
  {name:'Universitas Muhammadiyah Semarang',city:'Semarang',type:'Education'},
  {name:'Universitas Muhammadiyah Surabaya',city:'Surabaya',type:'Education'},
  {name:'Universitas Muhammadiyah Yogyakarta',city:'Yogyakarta',type:'Education'},
  {name:'Universitas Multimedia Nusantara',city:'Banten',type:'Education'},
  {name:'Universitas Sanata Dharma',city:'Yogyakarta',type:'Education'},
  {name:'Yayasan Monash University Indonesia',city:'Tangerang',type:'International'},
  {name:'Academy Computer Security Incident Response Team (ACAD CSIRT)',city:'Jakarta',type:'National'},
  {name:'Asosiasi Eksportir dan Produsen Handicraft Indonesia (ASEPHI)',city:'Jakarta',type:'National'},
  {name:'Bebras Indonesia',city:'Bandung',type:'National'},
  {name:'Federation Internationale Du Beton Indonesia (FIB)',city:'Semarang',type:'International'},
  {name:'Foreign Policy Community of Indonesia (FPCI)',city:'Jakarta',type:'National'},
  {name:'IDP South Jakarta',city:'Jakarta',type:'International'},
  {name:'Ikatan Akuntan Indonesia (IAI) Jatim',city:'Surabaya',type:'National'},
  {name:'Institut Bisnis & Multimedia Asmi',city:'Jakarta',type:'Education'},
  {name:'Institut Kesehatan Helvetia',city:'Medan',type:'Education'},
  {name:'Institut Teknologi dan Bisnis Asia Malang',city:'Malang',type:'Education'},
  {name:'Institut Teknologi Nasional Bandung (ITENAS)',city:'Bandung',type:'Education'},
  {name:'International Test Center (ITC)',city:'Jakarta',type:'International'},
  {name:'Jakarta International University (JIU)',city:'Jakarta',type:'Education'},
  {name:'Perkumpulan Project Management Indonesia (PMIIC)',city:'Jakarta',type:'National'},
  {name:'Persatuan Dokter Gigi Indonesia Wilayah Jatim (PDGI)',city:'Surabaya',type:'National'},
  {name:'PT Multi Spunindo Jaya',city:'Sidoarjo',type:'National'},
  {name:'PT Odoo Software Indonesia',city:'Tangerang',type:'International'},
  {name:'PT Semen Imasco Asiatic',city:'Jember',type:'National'},
  {name:'PT Surabaya Wire',city:'Gresik',type:'National'},
  {name:'PT. PathGen Diagnostik Teknologi',city:'Jakarta',type:'National'},
  {name:'PT. Piaget Indonesia',city:'Jakarta',type:'International'},
  {name:'PT. Saraswanti Indo Genetech Surabaya (SIG)',city:'Surabaya',type:'National'},
  {name:'PT. Sentra Vidya Utama (Sevima)',city:'Surabaya',type:'National'},
  {name:'Universitas Abdurachman Saleh Situbondo (UNARS)',city:'Situbondo',type:'Education'},
  {name:'Universitas Alma Ata',city:'Yogyakarta',type:'Education'},
  {name:'Universitas Anwar Medika',city:'Sidoarjo',type:'Education'},
  {name:'Universitas Baiturrahmah',city:'Padang',type:'Education'},
  {name:'Universitas Dr. Soetomo',city:'Surabaya',type:'Education'},
  {name:'Universitas Hamzanwadi',city:'Lombok',type:'Education'},
  {name:'Universitas Hang Tuah',city:'Surabaya',type:'Education'},
  {name:'Universitas Hayam Wuruk Perbanas',city:'Surabaya',type:'Education'},
  {name:'Universitas HKBP Nommensen Medan',city:'Medan',type:'Education'},
  {name:'Universitas Islam Darul Ulum Lamongan',city:'Lamongan',type:'Education'},
  {name:'Universitas Kadiri',city:'Kediri',type:'Education'},
  {name:'Universitas Kristen Indonesia Maluku (UKIM)',city:'Ambon',type:'Education'},
  {name:'Universitas Kristen Indonesia Paulus Makassar',city:'Makassar',type:'Education'},
  {name:'Universitas Kristen Papua',city:'Sorong',type:'Education'},
  {name:'Universitas Mahasaraswati (UNMAS)',city:'Denpasar',type:'Education'},
  {name:'Universitas Mega Buana Palopo',city:'Palopo',type:'Education'},
  {name:'Universitas Merdeka Pasuruan',city:'Pasuruan',type:'Education'},
  {name:'Universitas Muhammadiyah Sidoarjo',city:'Sidoarjo',type:'Education'},
  {name:'Universitas Nahdlatul Ulama Surabaya',city:'Surabaya',type:'Education'},
  {name:'Universitas Narotama',city:'Surabaya',type:'Education'},
  {name:'Universitas Nasional',city:'Jakarta',type:'Education'},
  {name:'Universitas Ottow Geissler Papua',city:'Jayapura',type:'Education'},
  {name:'Universitas Pendidikan Ganesha (Undiksha)',city:'Bali',type:'Education'},
  {name:'Universitas PGRI Adi Buana Surabaya',city:'Surabaya',type:'Education'},
  {name:'Universitas PGRI Kanjuruhan Malang',city:'Malang',type:'Education'},
  {name:'Universitas Prima Nusantara Bukittinggi',city:'Bukittinggi',type:'Education'},
  {name:'Universitas Riau Kepulauan (UNRIKA)',city:'Batam',type:'Education'},
  {name:'Universitas Syah Kuala',city:'Aceh',type:'Education'},
  {name:'Universitas Triatma Mulya (UNTRIM)',city:'Bali',type:'Education'},
  {name:'Universitas Tribhuwana Tunggadewi',city:'Malang',type:'Education'},
  {name:'Universitas Widya Kartika (UWIKA)',city:'Surabaya',type:'Education'},
  {name:'Universitas Widyatama',city:'Bandung',type:'Education'},
  {name:'Asosiasi Dosen Pengabdian Kepada Masyarakat Indonesia',city:'Padang',type:'National'},
  {name:'Badan Arsip dan Perpustakaan Kota Surabaya',city:'Surabaya',type:'Government'},
  {name:'Badan Musyawarah Antar Gereja (BAMAG) Kota Surabaya',city:'Surabaya',type:'National'},
  {name:'Junior Chamber International (JCI) East Java',city:'Surabaya',type:'International'},
  {name:'Pemerintah Desa Jarak Kec. Wonosalam Kab. Jombang',city:'Jombang',type:'Government'},
  {name:'Pemerintah Desa Mojotrisno',city:'Jombang',type:'Government'},
  {name:'Pemerintah Kabupaten Sumba Barat Daya',city:'NTT',type:'Government'},
  {name:'Pemerintah Kabupaten Sumba Timur',city:'NTT',type:'Government'},
  {name:'Pemerintahan Kabupaten Kaimana',city:'Papua',type:'Government'},
  {name:'RS Bhayangkara HS. Samsoeri Mertojoso',city:'Surabaya',type:'Government'},
  {name:'RS Bhayangkara Pusdik Sabhara Porong',city:'Sidoarjo',type:'Government'},
  {name:'RSUD Bhakti Dharma Husada',city:'Surabaya',type:'Government'},
  {name:'RSUD dr. Mohamad Soewandhie',city:'Surabaya',type:'Government'},
  {name:'RSUD Haji Provinsi Jawa Timur',city:'Surabaya',type:'Government'},
  {name:'Rumah Sakit Jiwa Menur (RSJ Menur)',city:'Surabaya',type:'Government'},
  {name:'Sekolah Tinggi Ilmu Ekonomi (STIE) Malangkucecwara',city:'Malang',type:'Education'},
  {name:'Universitas Sains Dan Teknologi Komputer (STEKOM)',city:'Semarang',type:'Education'},
  {name:'Wisma Jerman',city:'Surabaya',type:'International'},
  {name:'Artax',city:'Surabaya',type:'Regional / local'},
  {name:'Chung Chung Christian School',city:'Surabaya',type:'Regional / local'},
  {name:'CV Agatha Management (AM Models)',city:'Surabaya',type:'Regional / local'},
  {name:'CV C PLUS C Desain Komunikasi',city:'Surabaya',type:'Regional / local'},
  {name:'CV Zentax Consulting',city:'Surabaya',type:'Regional / local'},
  {name:'Elyon Christian School',city:'Surabaya',type:'Regional / local'},
  {name:'Gereja Kristen Jawi Wetan (GKJW)',city:'Malang',type:'Regional / local'},
  {name:'Gereja Sidang Jemaat Allah Eben Haezer (GSJA)',city:'Surabaya',type:'Regional / local'},
  {name:'Indonesia Cyber Education Institute (ICE Institute)',city:'Tangerang',type:'Regional / local'},
  {name:'Indonesian Fashion Chamber',city:'Jakarta',type:'Regional / local'},
  {name:'Komunitas Surabaya Tempo Dulu',city:'Surabaya',type:'Regional / local'},
  {name:'Lembaga Alkitab Indonesia (LAI)',city:'Jakarta',type:'Regional / local'},
  {name:'Mari Works',city:'Jakarta',type:'Regional / local'},
  {name:'Nuadu',city:'Jakarta',type:'Regional / local'},
  {name:'Ob Anggen School',city:'Papua',type:'Regional / local'},
  {name:'Poshana',city:'Jakarta',type:'Regional / local'},
  {name:'PPPK Petra Surabaya',city:'Surabaya',type:'Regional / local'},
  {name:'PT Aruna Veda Kreasi',city:'Jakarta',type:'Regional / local'},
  {name:'PT Asuransi Mega Pratama',city:'Surabaya',type:'Regional / local'},
  {name:'PT Ayena Mandiri Sinema (Ayena Studio)',city:'Jakarta',type:'Regional / local'},
  {name:'PT Bakels Indonesia',city:'Jakarta',type:'Regional / local'},
  {name:'PT Berpikir Revolusioner Indonesia (Narasio)',city:'Surabaya',type:'Regional / local'},
  {name:'PT Biochem Technology',city:'Surabaya',type:'Regional / local'},
  {name:'PT Bukit Vista Nusantara',city:'Bali',type:'Regional / local'},
  {name:'PT Cross Network Indonesia',city:'Surabaya',type:'Regional / local'},
  {name:'PT Deus Digital Transformasi Universal',city:'Surabaya',type:'Regional / local'},
  {name:'PT Dinamika Manajemen Investama (Duo Dinamika)',city:'Surabaya',type:'Regional / local'},
  {name:'PT Dunia Bayar Indonesia (AiYO)',city:'Tangerang',type:'Regional / local'},
  {name:'PT Elefante Infradiji Solusi',city:'Surabaya',type:'Regional / local'},
  {name:'PT ePac Flexibles Indonesia',city:'Tangerang',type:'Regional / local'},
  {name:'PT Graha Inti Jaya',city:'Jakarta',type:'Regional / local'},
  {name:'PT Gree Electric Appliances Indonesia',city:'Jakarta',type:'Regional / local'},
  {name:'PT Hatsonsurya Electric (Hartono)',city:'Surabaya',type:'Regional / local'},
  {name:'PT IDNFT Menuju Bulan',city:'Tangerang',type:'Regional / local'},
  {name:'PT Indo Ceria Plastik dan Printing',city:'Sidoarjo',type:'Regional / local'},
  {name:'PT Industrial Robotic Automation (IRA)',city:'Surabaya',type:'Regional / local'},
  {name:'PT Insan Sejahtera Engineering',city:'Sidoarjo',type:'Regional / local'},
  {name:'PT Intidaya Dinamika Sejati',city:'Surabaya',type:'Regional / local'},
  {name:'PT Kawan Main Bersama (Tabletoys Indonesia)',city:'Surabaya',type:'Regional / local'},
  {name:'PT Kuncie Pintar Nusantara',city:'Jakarta',type:'Regional / local'},
  {name:'PT Lanius',city:'Surabaya',type:'Regional / local'},
  {name:'PT Lentera Edukasi Global (LEG)',city:'Surabaya',type:'Regional / local'},
  {name:'PT Lingkar Indonesia Unggul (ISCEA Indonesia)',city:'Surabaya',type:'Regional / local'},
  {name:'PT Mahaghora',city:'Surabaya',type:'Regional / local'},
  {name:'PT Mentari Mas Multimoda',city:'Surabaya',type:'Regional / local'},
  {name:'PT Mitra Akselerasi Bersama (MAB Consulting)',city:'Surabaya',type:'Regional / local'},
  {name:'PT Murni Solusindo Nusantara',city:'Jakarta',type:'Regional / local'},
  {name:'PT Pasagung Anthrakia Semesta',city:'Surabaya',type:'Regional / local'},
  {name:'PT Populix Informasi Teknologi',city:'Jakarta',type:'Regional / local'},
  {name:'PT Samaya Multikarya Sentosa',city:'Surabaya',type:'Regional / local'},
  {name:'PT Surya Multi Cemerlang',city:'Sidoarjo',type:'Regional / local'},
  {name:'PT Tancorp Abadi Nusantara',city:'Sidoarjo',type:'Regional / local'},
  {name:'PT Tiga Dinamika Solusi Indonesia (3DS)',city:'Surabaya',type:'Regional / local'},
  {name:'PT Tribelio Digital Global',city:'Jakarta',type:'Regional / local'},
  {name:'PT ValuePlus Indoraya',city:'Jakarta',type:'Regional / local'},
  {name:'PT Visiniaga Mitra Kreasindo',city:'Surabaya',type:'Regional / local'},
  {name:'PT Wahana Kemalaniaga Makmur (WAKENI)',city:'Jakarta',type:'Regional / local'},
  {name:'PT. Berawal Dari Media (Socioworks)',city:'Surabaya',type:'Regional / local'},
  {name:'PT. Ceria Belajar Edukasi Indonesia (Wondermind)',city:'Jakarta',type:'Regional / local'},
  {name:'PT. Fuboru Indonesia',city:'Sidoarjo',type:'Regional / local'},
  {name:'PT. Global Industri Teknologi Solusi (GITS)',city:'Surabaya',type:'Regional / local'},
  {name:'PT. Kresna Karya Teknologi',city:'Surabaya',type:'Regional / local'},
  {name:'PT. Mataram Paint',city:'Sidoarjo',type:'Regional / local'},
  {name:'PT. Mikatasa Agung',city:'Surabaya',type:'Regional / local'},
  {name:'PT. Riliv Psikologi Indonesia',city:'Sidoarjo',type:'Regional / local'},
  {name:'PT. Sinko Prima Alloy',city:'Surabaya',type:'Regional / local'},
  {name:'PT. Sosial Berkat Kreatif Indonesia (Social Bread)',city:'Tangerang',type:'Regional / local'},
  {name:'PT. Suparma Tbk',city:'Surabaya',type:'Regional / local'},
  {name:'Revolt Industry',city:'Surabaya',type:'Regional / local'},
  {name:'Rumah Sakit William Booth',city:'Surabaya',type:'Regional / local'},
  {name:'Sekolah Betzata',city:'Minahasa',type:'Regional / local'},
  {name:'Sekolah Dasar Kristen Anugerah',city:'Jakarta',type:'Regional / local'},
  {name:'Sekolah Kristen Anak Bangsa',city:'Surabaya',type:'Regional / local'},
  {name:'Sekolah Luar Biasa (SLB) Siswa Budhi',city:'Surabaya',type:'Regional / local'},
  {name:'Sekolah Teologi Kristen Pelangi Kristus',city:'Surabaya',type:'Regional / local'},
  {name:'Sekolah Tinggi Teologi (STT) Amadeus',city:'Surabaya',type:'Regional / local'},
  {name:'Sekolah Tinggi Teologi Reformed Indonesia (STTRI)',city:'Jakarta',type:'Regional / local'},
  {name:'Tanda Seru',city:'Jakarta',type:'Regional / local'},
  {name:'Universitas Pradita',city:'Jakarta',type:'Education'},
  {name:'Vooya',city:'Jakarta',type:'Regional / local'},
  {name:'Yayasan Bersatu Membangun Bangsa',city:'Pontianak',type:'Regional / local'},
  {name:'Yayasan Caraka Mulia',city:'Surabaya',type:'Regional / local'},
  {name:'Yayasan Cinta Baca',city:'Bogor',type:'Regional / local'},
  {name:'Yayasan Eben Haezar',city:'Manado',type:'Regional / local'},
  {name:'Yayasan Edukasi Inti Pratama (IDS College)',city:'Jakarta',type:'Regional / local'},
  {name:'Yayasan Exodus (REC)',city:'Surabaya',type:'Regional / local'},
  {name:'Yayasan Habitat Kemanusiaan Indonesia (YHKI)',city:'Jakarta',type:'Regional / local'},
  {name:'Yayasan Haggai Indonesia',city:'Jakarta',type:'Regional / local'},
  {name:'Yayasan Harapan Cerah',city:'Jakarta',type:'Regional / local'},
  {name:'Yayasan Indonesia Sejahtera Barokah (YISB)',city:'Surabaya',type:'Regional / local'},
  {name:'Yayasan K-Pact Nusantara',city:'Kupang',type:'Regional / local'},
  {name:'Yayasan Kalam Kudus Indonesia (YKKI) Ambon',city:'Ambon',type:'Regional / local'},
  {name:'Yayasan Kalam Kudus Indonesia (YKKI) Medan',city:'Medan',type:'Regional / local'},
  {name:'Yayasan Mawar Sharon Peduli',city:'Surabaya',type:'Regional / local'},
  {name:'Yayasan Medicom Charity',city:'Malang',type:'Regional / local'},
  {name:'Yayasan Pakta Peduli Indonesia',city:'Surabaya',type:'Regional / local'},
  {name:'Yayasan Pendidikan Kristen (YPK) Jawa Timur',city:'Malang',type:'Regional / local'},
  {name:'Yayasan Pendidikan Kristen Gloria',city:'Surabaya',type:'Regional / local'},
  {name:'Yayasan Reformasi Injili Millennium',city:'Jakarta',type:'Regional / local'},
  {name:'Yong Chun Chinese Language Center',city:'Surabaya',type:'Regional / local'},
  {name:'Sekolah Tinggi Informatika & Komputer Indonesia (STIKI)',city:'Malang',type:'Education'},
  {name:'Universitas Katolik Indonesia Santu Paulus Ruteng',city:'NTT',type:'Education'},
]

const CONTINENT: Record<string, string> = {
  Japan:'asia','South Korea':'asia',China:'asia',Taiwan:'asia',
  Malaysia:'asia',Thailand:'asia',Philippines:'asia',Singapore:'asia',
  Bangladesh:'asia','Hong Kong':'asia',India:'asia',Macau:'asia',
  Mongolia:'asia',Cambodia:'asia','Timor Leste':'asia','United Arab Emirates':'asia',
  Netherlands:'europe','United Kingdom':'europe',Germany:'europe',France:'europe',
  Hungary:'europe',Ireland:'europe',Lithuania:'europe',Poland:'europe',
  Portugal:'europe',Romania:'europe',Switzerland:'europe',
  'United States':'americas',Canada:'americas',
  Australia:'oceania','New Zealand':'oceania',
}

const FLAG: Record<string, string> = {
  Japan:'🇯🇵','South Korea':'🇰🇷',China:'🇨🇳',Taiwan:'🇹🇼',
  Malaysia:'🇲🇾',Thailand:'🇹🇭',Philippines:'🇵🇭',Singapore:'🇸🇬',
  Bangladesh:'🇧🇩','Hong Kong':'🇭🇰',India:'🇮🇳',Macau:'🇲🇴',
  Mongolia:'🇲🇳',Cambodia:'🇰🇭','Timor Leste':'🇹🇱','United Arab Emirates':'🇦🇪',
  Netherlands:'🇳🇱','United Kingdom':'🇬🇧',Germany:'🇩🇪',France:'🇫🇷',
  Hungary:'🇭🇺',Ireland:'🇮🇪',Lithuania:'🇱🇹',Poland:'🇵🇱',
  Portugal:'🇵🇹',Romania:'🇷🇴',Switzerland:'🇨🇭',
  'United States':'🇺🇸',Canada:'🇨🇦',
  Australia:'🇦🇺','New Zealand':'🇳🇿',
}

const TYPE_COLOR: Record<string, { bg: string; text: string; border: string }> = {
  International:     { bg:'rgba(30,58,95,0.06)',  text:'#1E3A5F', border:'rgba(30,58,95,0.15)' },
  National:          { bg:'rgba(139,115,85,0.07)', text:'#8B7355', border:'rgba(139,115,85,0.2)' },
  Education:         { bg:'rgba(74,107,138,0.07)', text:'#4A6B8A', border:'rgba(74,107,138,0.2)' },
  Government:        { bg:'rgba(5,150,105,0.07)',  text:'#059669', border:'rgba(5,150,105,0.2)' },
  'Regional / local':{ bg:'rgba(92,92,92,0.05)',   text:'#5C5C5C', border:'rgba(92,92,92,0.15)' },
}

const PAGE_SIZE = 24

const CONT_BTNS = [
  { key:'all',      label:'All Regions' },
  { key:'asia',     label:'Asia' },
  { key:'europe',   label:'Europe' },
  { key:'americas', label:'Americas' },
  { key:'oceania',  label:'Oceania' },
]

const TYPE_BTNS = [
  { key:'all',              label:'All Types' },
  { key:'International',    label:'Intl. Affiliated' },
  { key:'National',         label:'National' },
  { key:'Education',        label:'Education' },
  { key:'Government',       label:'Government' },
  { key:'Regional / local', label:'Regional / Local' },
]

export default function PartnerDirectory() {
  const [tab, setTab]                   = useState<'intl'|'dom'>('intl')
  const [intlContinent, setIntlCont]    = useState('all')
  const [domType, setDomType]           = useState('all')
  const [intlSearch, setIntlSearch]     = useState('')
  const [domSearch, setDomSearch]       = useState('')
  const [intlShowing, setIntlShowing]   = useState(PAGE_SIZE)
  const [domShowing, setDomShowing]     = useState(PAGE_SIZE)

  const filteredIntl = (() => {
    const q = intlSearch.toLowerCase().trim()
    if (q) return INTL_DATA.filter(p => p.name.toLowerCase().includes(q) || p.country.toLowerCase().includes(q))
    if (intlContinent !== 'all') return INTL_DATA.filter(p => CONTINENT[p.country] === intlContinent)
    return INTL_DATA
  })()

  const filteredDom = (() => {
    const q = domSearch.toLowerCase().trim()
    if (q) return DOM_DATA.filter(p => p.name.toLowerCase().includes(q) || p.city.toLowerCase().includes(q) || p.type.toLowerCase().includes(q))
    if (domType !== 'all') return DOM_DATA.filter(p => p.type === domType)
    return DOM_DATA
  })()

  const intlQ = intlSearch.trim()
  const domQ  = domSearch.trim()

  return (
    <div style={{ padding: '48px 24px 64px', background: '#FAFAF8' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6"><span className="accent-line" /><span className="label-small">Partner Directory</span></div>
        <h2 className="font-heading font-bold text-3xl mb-3" style={{ color: '#1C1C1E' }}>Browse the Full Network</h2>
        <p className="text-base max-w-3xl mb-8" style={{ color: '#5C5C5C' }}>All 505+ institutional partners I help manage through PCU — searchable and filterable by region or type.</p>

        {/* Tab switcher */}
        <div className="flex gap-0 mb-8 border-b" style={{ borderColor: 'rgba(28,28,30,0.1)' }}>
          <button onClick={() => setTab('intl')} style={{ padding: '12px 24px', fontSize: '.875rem', fontWeight: 600, background: 'transparent', cursor: 'pointer', borderBottom: tab === 'intl' ? '2px solid #1E3A5F' : '2px solid transparent', color: tab === 'intl' ? '#1C1C1E' : '#5C5C5C', marginBottom: -1, transition: 'all .2s' }}>
            International <span style={{ marginLeft: 6, padding: '2px 8px', fontSize: '.72rem', borderRadius: 999, background: tab === 'intl' ? 'rgba(30,58,95,0.08)' : 'rgba(28,28,30,0.06)', color: tab === 'intl' ? '#1E3A5F' : '#5C5C5C' }}>{INTL_DATA.length}</span>
          </button>
          <button onClick={() => setTab('dom')} style={{ padding: '12px 24px', fontSize: '.875rem', fontWeight: 600, background: 'transparent', cursor: 'pointer', borderBottom: tab === 'dom' ? '2px solid #166534' : '2px solid transparent', color: tab === 'dom' ? '#1C1C1E' : '#5C5C5C', marginBottom: -1, transition: 'all .2s' }}>
            Domestic <span style={{ marginLeft: 6, padding: '2px 8px', fontSize: '.72rem', borderRadius: 999, background: tab === 'dom' ? 'rgba(22,101,52,0.08)' : 'rgba(28,28,30,0.06)', color: tab === 'dom' ? '#166534' : '#5C5C5C' }}>{DOM_DATA.length}</span>
          </button>
        </div>

        {/* ── International Panel ── */}
        {tab === 'intl' && (
          <div>
            <div className="relative mb-5">
              <Search style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 15, height: 15, color: '#9CA3AF', pointerEvents: 'none' }} />
              <input
                value={intlSearch}
                onChange={e => { setIntlSearch(e.target.value); setIntlShowing(PAGE_SIZE) }}
                type="text"
                placeholder="Search institutions or countries…"
                style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: 12, border: '1px solid rgba(28,28,30,0.12)', outline: 'none', background: '#fff', color: '#1C1C1E', fontSize: '.875rem' }}
              />
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {CONT_BTNS.map(b => (
                <button key={b.key} onClick={() => { setIntlCont(b.key); setIntlShowing(PAGE_SIZE) }} style={{ padding: '6px 16px', borderRadius: 999, fontSize: '.72rem', fontWeight: 600, cursor: 'pointer', opacity: intlQ ? .4 : 1, pointerEvents: intlQ ? 'none' : 'auto', background: intlContinent === b.key && !intlQ ? '#1E3A5F' : '#fff', color: intlContinent === b.key && !intlQ ? '#fff' : '#5C5C5C', border: intlContinent === b.key && !intlQ ? '1px solid #1E3A5F' : '1px solid rgba(28,28,30,0.12)', transition: 'all .2s' }}>
                  {b.label}
                </button>
              ))}
            </div>
            <p style={{ fontSize: '.72rem', color: '#9CA3AF', marginBottom: 16 }}>
              {intlQ
                ? `${filteredIntl.length} result${filteredIntl.length !== 1 ? 's' : ''} for "${intlSearch}" — searching all regions`
                : `Showing ${Math.min(intlShowing, filteredIntl.length)} of ${filteredIntl.length} institutions`}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {filteredIntl.slice(0, intlShowing).map((p, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid rgba(28,28,30,0.08)', borderRadius: 12, padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span style={{ fontSize: '1.5rem', lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{FLAG[p.country] || '🌐'}</span>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontWeight: 500, fontSize: '.875rem', lineHeight: 1.3, color: '#1C1C1E' }}>{p.name}</p>
                      <p style={{ fontSize: '.72rem', marginTop: 4, color: '#9CA3AF' }}>{p.country}</p>
                    </div>
                  </div>
                </div>
              ))}
              {filteredIntl.length === 0 && <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '32px 0', fontSize: '.875rem', color: '#9CA3AF' }}>No institutions found.</p>}
            </div>
            {!intlQ && filteredIntl.length > intlShowing && (
              <div style={{ textAlign: 'center' }}>
                <button onClick={() => setIntlShowing(s => s + PAGE_SIZE)} style={{ padding: '10px 32px', borderRadius: 999, fontSize: '.875rem', fontWeight: 600, border: '1px solid rgba(28,28,30,0.12)', color: '#1C1C1E', background: '#fff', cursor: 'pointer' }}>
                  Load more ({filteredIntl.length - intlShowing} remaining)
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── Domestic Panel ── */}
        {tab === 'dom' && (
          <div>
            <div className="relative mb-5">
              <Search style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 15, height: 15, color: '#9CA3AF', pointerEvents: 'none' }} />
              <input
                value={domSearch}
                onChange={e => { setDomSearch(e.target.value); setDomShowing(PAGE_SIZE) }}
                type="text"
                placeholder="Search partners, cities, or types…"
                style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: 12, border: '1px solid rgba(28,28,30,0.12)', outline: 'none', background: '#fff', color: '#1C1C1E', fontSize: '.875rem' }}
              />
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {TYPE_BTNS.map(b => (
                <button key={b.key} onClick={() => { setDomType(b.key); setDomShowing(PAGE_SIZE) }} style={{ padding: '6px 16px', borderRadius: 999, fontSize: '.72rem', fontWeight: 600, cursor: 'pointer', opacity: domQ ? .4 : 1, pointerEvents: domQ ? 'none' : 'auto', background: domType === b.key && !domQ ? '#166534' : '#fff', color: domType === b.key && !domQ ? '#fff' : '#5C5C5C', border: domType === b.key && !domQ ? '1px solid #166534' : '1px solid rgba(28,28,30,0.12)', transition: 'all .2s' }}>
                  {b.label}
                </button>
              ))}
            </div>
            <p style={{ fontSize: '.72rem', color: '#9CA3AF', marginBottom: 16 }}>
              {domQ
                ? `${filteredDom.length} result${filteredDom.length !== 1 ? 's' : ''} for "${domSearch}" — searching all types`
                : `Showing ${Math.min(domShowing, filteredDom.length)} of ${filteredDom.length} partners`}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {filteredDom.slice(0, domShowing).map((p, i) => {
                const tc = TYPE_COLOR[p.type] || TYPE_COLOR['Regional / local']
                return (
                  <div key={i} style={{ background: '#fff', border: '1px solid rgba(28,28,30,0.08)', borderRadius: 12, padding: 16 }}>
                    <p style={{ fontWeight: 500, fontSize: '.875rem', lineHeight: 1.3, color: '#1C1C1E', marginBottom: 8 }}>{p.name}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' as const }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '.72rem', color: '#9CA3AF' }}>
                        <MapPin style={{ width: 11, height: 11 }} /> {p.city}
                      </span>
                      <span style={{ padding: '2px 8px', borderRadius: 999, fontSize: '.72rem', fontWeight: 500, background: tc.bg, color: tc.text, border: `1px solid ${tc.border}` }}>{p.type}</span>
                    </div>
                  </div>
                )
              })}
              {filteredDom.length === 0 && <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '32px 0', fontSize: '.875rem', color: '#9CA3AF' }}>No partners found.</p>}
            </div>
            {!domQ && filteredDom.length > domShowing && (
              <div style={{ textAlign: 'center' }}>
                <button onClick={() => setDomShowing(s => s + PAGE_SIZE)} style={{ padding: '10px 32px', borderRadius: 999, fontSize: '.875rem', fontWeight: 600, border: '1px solid rgba(28,28,30,0.12)', color: '#1C1C1E', background: '#fff', cursor: 'pointer' }}>
                  Load more ({filteredDom.length - domShowing} remaining)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
