
import {Helmet} from "react-helmet-async";

interface MetaProps {
    title?: string;
    description?: string;
    keywords?: string;
}

export default function Meta({
    title = "Welcome to Project Tools",
    description = "Use for Project Management",
    keywords = "Improve project accountability"
                             }: MetaProps) {
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
    </Helmet>
}

