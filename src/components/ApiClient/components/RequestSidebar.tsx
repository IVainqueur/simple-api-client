interface RequestSidebarProps {
  isDark: boolean;
  onThemeToggle: () => void;
  requests: Request[];
  activeRequestId: string | null;
  onRequestSelect: (request: Request) => void;
  onNewRequest: () => void;
  onDeleteRequest: (id: string) => void;
  onUpdateRequest: (id: string, updates: Partial<Request>) => void;
  onSaveSession: () => void;
  onImportSession: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExportSession: () => void;
}

export function RequestSidebar({
  isDark,
  onThemeToggle,
  requests,
  activeRequestId,
  onRequestSelect,
  onNewRequest,
  onDeleteRequest,
  onUpdateRequest,
  onSaveSession,
  onImportSession,
  onExportSession
}: RequestSidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-900">
      {/* ... rest of the component ... */}
      {requests.map((request) => (
        <div
          key={request.id}
          className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
            request.id === activeRequestId ? 'bg-gray-100 dark:bg-gray-800' : ''
          }`}
          onClick={() => onRequestSelect(request)}
        >
          <div className="flex items-center justify-between group">
            {editingId === request.id ? (
              <RequestNameEdit
                name={request.name}
                onSave={(name) => {
                  onUpdateRequest(request.id, { name });
                  setEditingId(null);
                }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <Folder size={16} />
                  <span className="truncate">{request.name}</span>
                </div>
                <div className="hidden group-hover:flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingId(request.id);
                    }}
                    className="p-1 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteRequest(request.id);
                    }}
                    className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
      {/* ... rest of the component ... */}
    </div>
  );
}