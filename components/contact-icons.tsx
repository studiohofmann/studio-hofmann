import Link from 'next/link'
import { PhoneFilled, MailFilled, InstagramFilled } from '@ant-design/icons';



export default function ContactIcons() {
    return <div className="flex gap-2">
        <div className="bg-neutral-200 border border-neutral-700 shadow-md w-10 flex items-center justify-center">
            <Link href="/dashboard" className="w-6 h-6 m-1 bg-slate-400 rounded-full flex items-center justify-center">
                <PhoneFilled style={{ color: "#f5f5f5" }} />
            </Link >
        </div>
        <div className="bg-neutral-200 border border-neutral-700 shadow-md w-10 flex items-center justify-center">
            <Link href="/dashboard" className="w-6 h-6 m-1 bg-slate-400 rounded-full flex items-center justify-center">
                <MailFilled style={{ color: "#f5f5f5" }} />
            </Link>
        </div>
        <div className="bg-neutral-200 border border-neutral-700 shadow-md w-10 flex items-center justify-center">
            <Link href="/dashboard" className="w-6 h-6 m-1 bg-slate-400 rounded-full flex items-center justify-center">
                <InstagramFilled style={{ color: "#f5f5f5" }} />
            </Link>
        </div>
    </div>;
}