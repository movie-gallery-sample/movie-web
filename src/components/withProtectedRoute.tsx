import { useAuth } from "./provider/AuthProvider";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const withProtectedRoute = (WrappedComponent: React.ComponentType) => {
  // eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
  return (props: any) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.replace("/login");
      }
    }, [user, router]);

    if (!user) {
      return router.replace("/login");
    }

    return <WrappedComponent {...props} />;
  };
};

export default withProtectedRoute;
