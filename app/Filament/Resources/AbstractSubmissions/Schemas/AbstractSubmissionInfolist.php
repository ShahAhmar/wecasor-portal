<?php

namespace App\Filament\Resources\AbstractSubmissions\Schemas;

use App\Models\AbstractSubmission;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class AbstractSubmissionInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('id')
                    ->label('ID'),
                TextEntry::make('name'),
                TextEntry::make('email')
                    ->label('Email address'),
                TextEntry::make('institution'),
                TextEntry::make('country'),
                TextEntry::make('title'),
                TextEntry::make('abstract_content')
                    ->columnSpanFull(),
                TextEntry::make('thematic_area'),
                TextEntry::make('presentation_type'),
                TextEntry::make('status'),
                TextEntry::make('language'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('deleted_at')
                    ->dateTime()
                    ->visible(fn (AbstractSubmission $record): bool => $record->trashed()),
            ]);
    }
}
