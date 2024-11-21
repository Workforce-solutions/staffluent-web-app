import { Button } from "react-day-picker";
import {Download, Loader2} from "lucide-react";
import {ExportButtonProps} from "../../@types/analytics";

export function ExportButton({ onExport, isLoading }: ExportButtonProps) {
    return (
        <Button
            // @ts-ignore
            variant="outline"
            onClick={onExport}
            disabled={isLoading}
        >
            {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Download className="mr-2 h-4 w-4" />
            )}
            Export
        </Button>
    );
}