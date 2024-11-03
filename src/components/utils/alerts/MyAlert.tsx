import { Alert, AlertDescription, AlertTitle } from '@/components/utils/alerts';

export function MyAlert({ title = 'Error', message = '' }) {
  return (
    <Alert className="border-[#FDEDEB] bg-[#FDEDEB]">
      {title && (
        <div className="flex items-center gap-3">
          <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 15C10.2833 15 10.521 14.904 10.713 14.712C10.9043 14.5207 11 14.2833 11 14C11 13.7167 10.9043 13.479 10.713 13.287C10.521 13.0957 10.2833 13 10 13C9.71667 13 9.47933 13.0957 9.288 13.287C9.096 13.479 9 13.7167 9 14C9 14.2833 9.096 14.5207 9.288 14.712C9.47933 14.904 9.71667 15 10 15ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6873 3.825 17.975 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.262667 12.6833 0 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31267 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.31233 6.1 0.787C7.31667 0.262333 8.61667 0 10 0C11.3833 0 12.6833 0.262333 13.9 0.787C15.1167 1.31233 16.175 2.025 17.075 2.925C17.975 3.825 18.6873 4.88333 19.212 6.1C19.7373 7.31667 20 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6873 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6873 13.9 19.212C12.6833 19.7373 11.3833 20 10 20ZM10 11C10.2833 11 10.521 10.904 10.713 10.712C10.9043 10.5207 11 10.2833 11 10V6C11 5.71667 10.9043 5.479 10.713 5.287C10.521 5.09567 10.2833 5 10 5C9.71667 5 9.47933 5.09567 9.288 5.287C9.096 5.479 9 5.71667 9 6V10C9 10.2833 9.096 10.5207 9.288 10.712C9.47933 10.904 9.71667 11 10 11Z"
              fill="#F04438"
            />
          </svg>

          <AlertTitle className="text-sm font-bold text-[#F04438] lg:text-base">
            {title}
          </AlertTitle>
        </div>
      )}
      <div className="flex items-center gap-3">
        <div className="h-5 w-5"></div>
        <AlertDescription className="text-primaryBlack">
          {message}
        </AlertDescription>
      </div>
    </Alert>
  );
}
