import { ErrorBoundary } from "@/components/shared/error-boundary";
import ProfileCard from "./components/profile-card";

export default function ProfilePage() {
  return (
    <section>
      <header>hello from profile</header>
      <ErrorBoundary>
        <ProfileCard />
      </ErrorBoundary>
    </section>
  );
}
