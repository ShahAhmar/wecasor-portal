<?php

namespace App\Filament\Resources\Studies\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class StudyForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                TextInput::make('study_code')
                    ->label('Study Code / ID'),
                Textarea::make('description')
                    ->columnSpanFull(),
                TextInput::make('pi_name')
                    ->label('Principal Investigator'),
                \Filament\Forms\Components\Select::make('status')
                    ->options([
                        'Active' => 'Active',
                        'Planned' => 'Planned',
                        'Completed' => 'Completed',
                        'On Hold' => 'On Hold',
                    ])
                    ->default('Planned')
                    ->required(),
                DatePicker::make('start_date'),
                DatePicker::make('end_date'),
                \Filament\Forms\Components\TagsInput::make('country_coverage')
                    ->label('Country Coverage')
                    ->placeholder('Add country...'),
            ]);
    }
}
