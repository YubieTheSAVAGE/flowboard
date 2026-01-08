import { Card } from "../card";
import { Suspense } from "react";
import { Skeleton } from "../skeleton";
import { getAuditLogs } from "@/lib/dal/audit";
import { AuditAction } from "@/generated/prisma/client";
import { 
    FileText, 
    FilePlus, 
    FilePen, 
    FileX,
    ClipboardList,
    ClipboardPlus,
    ClipboardPen,
    ClipboardX
} from "lucide-react";

function getActionIcon(action: AuditAction) {
    const iconClass = "w-5 h-5";
    switch (action) {
        case "CREATE_PROJECT":
            return <FilePlus className={`${iconClass} text-green-500`} />;
        case "UPDATE_PROJECT":
            return <FilePen className={`${iconClass} text-blue-500`} />;
        case "DELETE_PROJECT":
            return <FileX className={`${iconClass} text-red-500`} />;
        case "CREATE_TASK":
            return <ClipboardPlus className={`${iconClass} text-green-500`} />;
        case "UPDATE_TASK":
            return <ClipboardPen className={`${iconClass} text-blue-500`} />;
        case "DELETE_TASK":
            return <ClipboardX className={`${iconClass} text-red-500`} />;
        default:
            return <FileText className={iconClass} />;
    }
}

function getActionLabel(action: AuditAction) {
    return action.replace(/_/g, " ").toLowerCase().replace(/^\w/, c => c.toUpperCase());
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(date));
}

async function LogsList() {
    const logs = await getAuditLogs();
    
    if (!logs || logs.length === 0) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-gray-500 italic">No audit logs found</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {logs.map((log) => (
                <Card key={log.id} className="flex flex-row items-center gap-4 p-4 py-4">
                    <div className="shrink-0">
                        {getActionIcon(log.action)}
                    </div>
                    <div className="grow min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">{getActionLabel(log.action)}</span>
                            <span className="text-sm text-muted-foreground">by {log.user.name}</span>
                        </div>
                        {log.message && (
                            <p className="text-sm text-muted-foreground truncate">{log.message}</p>
                        )}
                    </div>
                    <div className="shrink-0 text-sm text-muted-foreground">
                        {formatDate(log.createdAt)}
                    </div>
                </Card>
            ))}
        </div>
    );
}

function LogsLoading() {
    return (
        <div className="flex flex-col gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} className="flex flex-row items-center gap-4 p-4 py-4">
                    <Skeleton className="h-5 w-5 rounded" />
                    <div className="grow">
                        <Skeleton className="h-4 w-48 mb-2" />
                        <Skeleton className="h-3 w-64" />
                    </div>
                    <Skeleton className="h-3 w-24" />
                </Card>
            ))}
        </div>
    );
}

export default function LogsData() {
    return (
        <Suspense fallback={<LogsLoading />}>
            <LogsList />
        </Suspense>
    );
}
