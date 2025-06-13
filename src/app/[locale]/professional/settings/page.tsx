"use client";
import Footer from "../../(features)/_components/footer";
import Settings from "../../(features)/_components/Settings";
import Header from "../_components/header";


export default function SettingsPage() {
    return (
        <>
            <Header searchQuery={""} setSearchQuery={function (): void {
                throw new Error("Function not implemented.");
            }} filter={[]} setFilter={function (): void {
                throw new Error("Function not implemented.");
            }} />
            <Settings />
            <Footer />
        </>
    );
}