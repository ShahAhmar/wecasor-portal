<?php

namespace App\Filament\Resources\Studies;

use App\Filament\Resources\Studies\Pages\CreateStudy;
use App\Filament\Resources\Studies\Pages\EditStudy;
use App\Filament\Resources\Studies\Pages\ListStudies;
use App\Filament\Resources\Studies\Pages\ViewStudy;
use App\Filament\Resources\Studies\Schemas\StudyForm;
use App\Filament\Resources\Studies\Schemas\StudyInfolist;
use App\Filament\Resources\Studies\Tables\StudiesTable;
use App\Models\Study;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class StudyResource extends Resource
{
    protected static ?string $model = Study::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;
    protected static ?int $navigationSort = 4;
    protected static ?string $navigationLabel = 'Studies / Projects';

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return StudyForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return StudyInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return StudiesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListStudies::route('/'),
            'create' => CreateStudy::route('/create'),
            'view' => ViewStudy::route('/{record}'),
            'edit' => EditStudy::route('/{record}/edit'),
        ];
    }
}
