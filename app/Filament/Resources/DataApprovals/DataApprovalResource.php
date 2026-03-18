<?php

namespace App\Filament\Resources\DataApprovals;

use App\Filament\Resources\DataApprovals\Pages\ManageDataApprovals;
use App\Filament\Resources\DataSubmissions\Schemas\DataSubmissionForm;
use App\Filament\Resources\DataSubmissions\Tables\DataSubmissionsTable;
use App\Models\DataSubmission;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class DataApprovalResource extends Resource
{
    protected static ?string $model = DataSubmission::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;
    protected static ?int $navigationSort = 8;
    protected static ?string $navigationLabel = 'Submissions / Approvals';

    protected static ?string $recordTitleAttribute = 'id';

    public static function form(Schema $schema): Schema
    {
        return DataSubmissionForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return DataSubmissionsTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageDataApprovals::route('/'),
        ];
    }
}
