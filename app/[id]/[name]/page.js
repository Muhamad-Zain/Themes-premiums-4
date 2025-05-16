"use client"; // Menandakan bahwa komponen ini harus dijalankan di sisi klien
import App from "@/components/app/page"; // Ganti path ini sesuai dengan lokasi komponen App
import { useParams } from "next/navigation";

export default function InvitationPage() {
    const { id, name } = useParams(); // Mengambil id dan name dari URL

    const idParams = id ? id : ''; // Mengatur idParams
    const namaTamu = name ? name.replace(/_/g, ' ') : 'Nama Tamu'; // Mengganti underscore dengan spasi

    return (
        <section>
            <App id={idParams} name={namaTamu} />
        </section>
    );
}
