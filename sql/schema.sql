CREATE TABLE users (
	id_user UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	nama VARCHAR(150) NOT NULL,
	email VARCHAR(150) UNIQUE NOT NULL,
	password_hash VARCHAR(255) NOT NULL,
	alamat TEXT NOT NULL,
	role_user VARCHAR(10) NOT NULL DEFAULT 'klien' CHECK (role_user IN ('klien', 'admin'))
);

CREATE TABLE paket (
	id_paket SERIAL PRIMARY KEY,
	jenis VARCHAR(50) NOT NULL CHECK (jenis IN ('Basic','Premium','Exclusive')),
	harga_dasar NUMERIC NOT NULL CHECK (harga_dasar > 0),
	harga_pertamu NUMERIC NOT NULL CHECK (harga_pertamu > 0)
);

CREATE TABLE kategori_acara (
	id_kategori SERIAL PRIMARY KEY,
	kategori VARCHAR(50) NOT NULL CHECK (kategori IN ('Pernikahan','Ulang Tahun','Seminar','Perusahaan'))
);

CREATE TABLE portofolio (
	id_portofolio SERIAL PRIMARY KEY,
	judul TEXT,
	id_kategori INTEGER NOT NULL REFERENCES kategori_acara(id_kategori),
	id_paket INTEGER NOT NULL REFERENCES paket(id_paket),
	deskripsi TEXT
);

CREATE TABLE book (
	book_id SERIAL PRIMARY KEY,
	id_user UUID NOT NULL REFERENCES users(id_user),
	tanggal_book TIMESTAMP DEFAULT NOW(),
	status_book VARCHAR(20) NOT NULL CHECK (status_book IN ('pending','accepted','cancelled'))
);

CREATE TABLE tambahan (
	id_tambahan SERIAL PRIMARY KEY,
	nama_tambahan TEXT,
	harga_tambahan NUMERIC NOT NULL CHECK (harga_tambahan > 0),
	per_tamu BOOLEAN NOT NULL
);

CREATE TABLE book_detail (
	detail_id SERIAL PRIMARY KEY,
	book_id INTEGER NOT NULL REFERENCES book(book_id),
	id_kategori INTEGER NOT NULL REFERENCES kategori_acara(id_kategori),
	id_paket INTEGER NOT NULL REFERENCES paket(id_paket),
	tanggal_acara DATE NOT NULL,
	jumlah_tamu INTEGER NOT NULL CHECK (jumlah_tamu > 0),
	harga_paket NUMERIC NOT NULL CHECK (harga_paket > 0),
	note TEXT
);

CREATE TABLE tambahan_detail (
	id_det_tambahan SERIAL PRIMARY KEY,
	detail_id INTEGER NOT NULL REFERENCES book_detail(detail_id),
	id_tambahan INTEGER NOT NULL REFERENCES tambahan(id_tambahan),
	jumlah INTEGER NOT NULL CHECK (jumlah > 0),
	harga_satuan NUMERIC NOT NULL CHECK (harga_satuan > 0)
);
