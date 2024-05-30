import { cn, Asset } from '@utils';

export const AssetInfo = ({
  focused,
  index,
  pageNumber,
  hash,
  asset,
}: {
  focused?: boolean;
  index?: number;
  pageNumber?: number;
  hash?: string;
  asset: Asset;
}) => {
  return (
    <div
      className={cn(
        'absolute bottom-0 w-full max-w-full overflow-hidden bg-slate-900',
        'duration-0 transition-all ease-in-out',
        'flex flex-col items-start justify-start text-xl text-slate-50',
        'h-1/2  opacity-0',
        focused && 'opacity-80',
      )}
    >
      <div className="p-1">
        <div className="text-sm">
          i:{index} p:{pageNumber}
        </div>
        <div className="text-xs">Hash {hash}</div>
        <div className="text-xs">Title {asset.title}</div>
        {/* <div className="text-xs">{asset.description}</div> */}
      </div>
    </div>
  );
};
