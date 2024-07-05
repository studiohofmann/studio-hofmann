import StudioName from "./studio-name";
import ContactIcons from "./contact-icons";

export default async function TopNavigation() {

    return (
        <div className="relative left-0 right-0">
            <div className="absolute px-2 mt-2 w-full flex justify-between items-center z-10 items-stretch h-10">
                <StudioName />
                <ContactIcons />
            </div>
        </div>


    )
}