import { LoadingSkeleton } from "@/features/loading-skeleton";
import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  max-width: 500px; // adjust this value based on your design
`;

const LoadingSkeletonWrapper = styled(LoadingSkeleton)`
  width: 100%;
`;

export default function Loading() {
  return (
    <LoadingContainer>
      <LoadingWrapper>
        <LoadingSkeletonWrapper />
      </LoadingWrapper>
    </LoadingContainer>
  );
}
