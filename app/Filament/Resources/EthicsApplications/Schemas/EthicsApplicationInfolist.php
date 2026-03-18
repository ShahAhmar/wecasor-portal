<?php

namespace App\Filament\Resources\EthicsApplications\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class EthicsApplicationInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('study_id')
                    ->numeric(),
                TextEntry::make('institution_id')
                    ->numeric(),
                TextEntry::make('user_id')
                    ->numeric(),
                TextEntry::make('protocol_document')
                    ->placeholder('-'),
                TextEntry::make('consent_form')
                    ->placeholder('-'),
                TextEntry::make('status'),
                TextEntry::make('submission_date')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
