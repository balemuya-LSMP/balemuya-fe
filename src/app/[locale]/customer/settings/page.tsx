'use client';

import Header from '../_components/header';
import Footer from '../../(features)/_components/footer';
import Settings from '../../(features)/_components/Settings';

export default function SettingsPage() {

    return (
        <>
            <Header
                searchQuery={''}
                setSearchQuery={function (): void {
                    throw new Error('Function not implemented.');
                }}
            />

            <Settings />

            <Footer />
        </>
    );
}