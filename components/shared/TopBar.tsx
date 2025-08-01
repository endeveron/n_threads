import Button from '@/components/shared/Button';
import {
  OrganizationSwitcher,
  SignOutButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import Image from 'next/image';
import Link from 'next/link';

const TopBar = async () => {
  return (
    <nav className="top-bar">
      <Link
        href="/"
        className="top-bar_logo flex items-center gap-3 p-2 rounded-lg"
      >
        <Image src="/assets/logo.svg" alt="logo" width={33} height={32} />
        <p className="text-heading3-bold text-heading-2">Threads</p>
      </Link>
      <div className="top-bar_content flex items-center gap-5">
        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: 'p-2',
            },
          }}
        />

        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <Image
                className="top-bar_logout-icon action-icon"
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
            </SignOutButton>
          </SignedIn>
        </div>

        <SignedOut>
          <Link href="/sign-in">
            <Button size="sm" className="px-6">
              Sign In
            </Button>
          </Link>
        </SignedOut>
      </div>
    </nav>
  );
};

export default TopBar;
